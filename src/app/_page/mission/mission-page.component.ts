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
  todayVersionIndex : number = null;
  userIsManager : boolean = false;
  userIsConsultantManager : boolean = false;

  @ViewChild('tabGrp') tabGrp : MatTabGroup;

  constructor(
    private _authService : AuthService,
    private _cdr : ChangeDetectorRef,
    private _dialog : MatDialog,
    private _missionService : MissionService,
    private _route : ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id : number = this._route.snapshot.params['id'];
    this._missionService.getMissionDetails(id).subscribe(
      mission => {
        this.selectedIndex = 0;
        this.mission = mission;
        this.userIsManager = this._authService.userIsManager();
        this.userIsConsultantManager = this.userIsManager 
          && mission.consultant.manager.id == this._authService.getUser().id;
        this._setTodayVersionIndex();
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
          this.mission.versions[this.todayVersionIndex][event.key] = event.value;
        },
        () => this._showErrorDialog("Impossible de mettre à jour les données.")
      )
  }

  public onNewVersion() : void {
    this._missionService.addVersion(this.mission.id).subscribe(
      () => { this.ngOnInit(); },
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

  private _setTodayVersionIndex() {
    let i = 0;
    do {
      if (!this._isToday(this.mission.versions[i].versionDate)) ++i
      else this.todayVersionIndex = i;
    } while (this.todayVersionIndex == null && i < this.mission.versions.length)
  }

  private _isToday(str : string) : boolean {
    const today : Date = new Date();
    const date : Date = new Date(str);
    return today.getDate() == date.getDate()
      && today.getFullYear() == date.getFullYear();
  }

  private _showErrorDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.autoFocus = true;
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

  onReload(){
    this.ngOnInit();
  }
}
