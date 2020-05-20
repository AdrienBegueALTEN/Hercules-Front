import { ProjectsEditComponent } from './../../_edit/projects-edit/projects-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SheetStatus } from './../../_enums/sheet-status.enum';
import { AuthService } from 'src/app/_services/auth.service';
import { MissionService } from '../../_services/mission.service';
import { Component, OnInit, AfterContentChecked, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { MatTabGroup } from '@angular/material/tabs';
import { saveAs } from "file-saver";
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss']
})
export class MissionPageComponent implements OnInit, AfterContentChecked {
  readonly CONSULTANT_TAB_INDEX : number = 2;
  readonly CUSTOMER_TAB_INDEX : number = 3;
  
  mission : any;
  selectedIndex : number = 0;
  userIsManager : boolean = false;
  userIsConsultantManager : boolean = false;

  @ViewChild('tabGrp') tabGrp : MatTabGroup;
  @ViewChild('projectsEditComponent') projectsEdit : ProjectsEditComponent;

  constructor(
    private _authService : AuthService,
    private _cdr : ChangeDetectorRef,
    private _dialog : MatDialog,
    private _missionService : MissionService,
    private _route : ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit() : void {
    const id : number = this._route.snapshot.params['id'];
    this._missionService.getMissionDetails(id).subscribe(
      mission => {
        this.selectedIndex = 0;
        this.mission = mission;
        this.userIsManager = this._authService.userIsManager();
        this.userIsConsultantManager = this.userIsManager 
          && mission.consultant.manager.id == this._authService.getUser().id;
      },
      () => window.location.replace('not-found')
    )
  }

  public ngAfterContentChecked() : void {
    this._cdr.detectChanges();
  }

  public updateMission(event : any) : void {
    this._missionService
      .updateMission(this.mission.id, event.key, event.value).subscribe(
        () => {
          this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
          this.mission.versions[0][event.key] = event.value;
          this.mission.sheetStatus = SheetStatus.ON_GOING;
        },
        () => this._showErrorDialog("Impossible de mettre à jour les données.")
      )
  }

  public onNewVersion() : void {
    this._missionService.addVersion(this.mission.id).subscribe(
      () => this.ngOnInit(),
      () => this._showErrorDialog("Impossible de créer une nouvelle version.")
    );
  }

  public onDownloadEmail() : void {
    this._missionService.downloadEmailAccess(this.mission.id).subscribe(
      blob => {
        const fileName = ''.concat(
          this.mission.consultant.firstname,
          '_',
          this.mission.consultant.lastname,
          '_',
          this.mission.customer.name,
          ".eml").toLowerCase();
        saveAs(blob, fileName);
      },
      () => this._showErrorDialog("Impossible de télécharger le fichier.")
    );
  }

  public showMissionEdit() : boolean {
    return this.userIsConsultantManager && 
      this.selectedIndex === 0 &&
      this.mission.sheetStatus !== SheetStatus.VALIDATED
  }

  public showConsultantEdit() : boolean {
    return this.userIsConsultantManager && 
      !this.mission.consultant.releaseDate;
  }

  public showVersions() : boolean {
    return this.mission.versions.length > 1;
  }

  public getStatusText() : string {
    let str : string;
    switch (this.mission.sheetStatus) {
      case SheetStatus.ON_WAITING :
        str = 'en attente';
        break;
      case SheetStatus.ON_GOING :
        str = 'en cours';
        break;
      case SheetStatus.VALIDATED :
        str = 'validée';
    }
    return 'Fiche '.concat(str);
  }

  public missionIsValidated() : boolean {
    return this.mission.sheetStatus === SheetStatus.VALIDATED;
  }

  private _showErrorDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

  public createNewProject() : void {
    this._missionService.newProject(this.mission.id).subscribe(
      () => this.ngOnInit(),
      () => this._showErrorDialog("Impossible de créer un nouveau projet.")
    )
  }

  public updateProject(event : any) : void {
    const projectId = this.mission.versions[0].projects[event.index].id;
      this._missionService.updateProject(projectId, event.key, event.value).subscribe(
        () => {
          this.mission.versions[0].projects[event.index][event.key] = event.value;
          this.mission.sheetStatus = SheetStatus.ON_GOING;
          this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
        },
        () => this._showErrorDialog("Impossible de mettre à jour le projet.")
      );
  }

  public deleteProject(index : number) : void {
    const projectId = this.mission.versions[0].projects[index].id;
    this._missionService.deleteProject(projectId).subscribe(
      () => {
        this.mission.versions[0].projects.splice(index, 1);
        this.mission.sheetStatus = SheetStatus.ON_GOING;
        this.projectsEdit.tabGrp.selectedIndex = 0;
      },
      () => this._showErrorDialog("Impossible de supprimer le projet.")
    )
  }

  addImage(imageFile){
    this._missionService.upload(imageFile.file, imageFile.project).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          if(event.status==200){
            this._snackBar.open('Image changée', 'X', {duration: 2000});
            this.ngOnInit();
          }
          else
            this._showErrorDialog("Impossible de charger cette image.");
        }
      },
      err => {
        this._showErrorDialog("Impossible de charger cette image.");
      });
  }
}
