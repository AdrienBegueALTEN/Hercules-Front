import { MissionService } from './../../_services/mission.service';
import { ProjectsEditComponent } from './../../_edit/projects-edit/projects-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SheetStatus } from './../../_enums/sheet-status.enum';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, AfterContentChecked, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { saveAs } from "file-saver";
import { HttpResponse } from '@angular/common/http';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { MissionEditComponent } from 'src/app/_edit/mission-edit/mission-edit.component';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';

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
  @ViewChild('missionEditComponent') missionEdit : MissionEditComponent;
  @ViewChild('projectsEditComponent') projectsEdit : ProjectsEditComponent;

  constructor(
    private _authService : AuthService,
    private _cdr : ChangeDetectorRef,
    private _dialogUtils : DialogUtilsService,
    private _missionService : MissionService,
    private _route : ActivatedRoute,
    private _router : Router,
    private _snackBar: MatSnackBar,
    private _consultantService : ConsultantService
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
      () => this._router.navigateByUrl('not-found')
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
        () => this._dialogUtils.showMsgDialog("Impossible de mettre à jour les données.")
      )
  }

  public onNewVersion() : void {
    this._missionService.addVersion(this.mission.id).subscribe(
      () => this.ngOnInit(),
      () => this._dialogUtils.showMsgDialog("Impossible de créer une nouvelle version.")
    );
  }

  public onDownloadEmail() : void {
    this._authService.missionSheetAccess(this.mission.id).subscribe(
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
      () => this._dialogUtils.showMsgDialog("Impossible de télécharger le fichier.")
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

  public showNewVersion() : boolean {
    if (this.mission.sheetStatus !== SheetStatus.VALIDATED)
      return false;
    const todayDate : Date = new Date();
    const lastVersionDate : Date = new Date(this.mission.versions[0].versionDate);
    return lastVersionDate !== null &&
      todayDate.getFullYear() !== lastVersionDate.getFullYear() ||
      todayDate.getDate() !== lastVersionDate.getDate();
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

  public createNewProject() : void {
    this._missionService.newProject(this.mission.id).subscribe(
      () => this.ngOnInit(),
      () => this._dialogUtils.showMsgDialog("Impossible de créer un nouveau projet.")
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
        () => this._dialogUtils.showMsgDialog("Impossible de mettre à jour le projet.")
      );
  }

  public deleteProject(index : number) : void {
    const projectId = this.mission.versions[0].projects[index].id;
    this._missionService.deleteProject(projectId).subscribe(
      () => {
        this.mission.versions[0].projects.splice(index, 1);
        this.mission.sheetStatus = SheetStatus.ON_GOING;
      },
      () => this._dialogUtils.showMsgDialog("Impossible de supprimer le projet.")
    )
  }

  public onAddPicture(event : any) : void {
    this._missionService.uploadProjectPicture(event.picture, event.project).subscribe(
      response => {
        if (response instanceof HttpResponse)
          if (response.status === HttpStatus.OK)
            this.ngOnInit();
          else
            this._dialogUtils.showMsgDialog("Impossible de charger cette image.");
      },
      error => {
        if(error.status == HttpStatus.BAD_REQUEST){
          this._dialogUtils.showMsgDialog("Le logo n'a pas été chargé, seules les images de moins de 3 Mo en .jpg, .png, .gif, .ico, .svg et .webp sont acceptées.");
        }
        else
          this._dialogUtils.showMsgDialog("Impossible de charger cette image.");
      }
    );
  }

  public onRemovePicture(event : any) : void {
    this._missionService.removePictureFromProject(event.project).subscribe(
      () => this.ngOnInit(),
      error => console.log(error)
    );
  }

  public onSetReleaseDate() : void {
    const dialogRef = this._dialogUtils.showDeactivateDialog(this.mission.consultant)
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this._consultantService.updateConsultant(this.mission.consultant.id, 'releaseDate', data).subscribe(
            () => {
              this.mission.consultant.releaseDate = data;
              this.ngOnInit();
            }, 
            err => {console.log(err)}
          )
        }
      }); 
  }

  public addSkillToProject(skill: any){
    this._missionService.addSkillToProject(skill.project, [skill.skill]).subscribe(
      () => this._snackBar.open('La compétence \'' + skill.skill + '\' a été enregistrée.', 'X', {duration: 2000}),
      (err) => console.log(err) 
    );
  }

  public removeSkillFromProject(skill: any){
    this._missionService.removeSkillFromProject(skill.project, skill.skill).subscribe(
      () => this._snackBar.open('La compétence \'' + skill.skill.label + '\' a été retirée.', 'X', {duration: 2000}),
      (err) => console.log(err)
    )
  }

  public onValidate() : void {
    this._missionService.updateMission(this.mission.id, 'sheetStatus', SheetStatus.VALIDATED).subscribe(
      () => this.ngOnInit(),
      () => this._dialogUtils.showMsgDialog("Impossible de valider la dernière fiche mission.")
    )
  }

  public allFormsValid() : boolean {
    return (!this.missionEdit?.grp) ? false :
      this.missionEdit.grp.valid && this.projectsEdit.allFormsValid();
  }

  public onDelete() : void {
    this._missionService.deleteMission(this.mission.id).subscribe(
      () => this._router.navigateByUrl('')
    )
  }
}
