import { SheetStatus } from './../../_enums/sheet-status.enum';
import { AuthService } from 'src/app/_services/auth.service';
import { MissionService } from '../../_services/mission.service';
import { Component, OnInit, AfterContentChecked, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../_enums/role.enum';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';
import { MatTabGroup } from '@angular/material/tabs';

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
    private _cdr: ChangeDetectorRef,
    private _authService : AuthService,
    private _dialog : MatDialog,
    private _missionService : MissionService,
    private _route : ActivatedRoute
  ) {}

  ngOnInit() {
    const id : number = this._route.snapshot.params['id'];
    this._missionService.getMissionDetails(id).subscribe(
      mission => {
        this.selectedIndex = 0;
        this.mission = mission;
        const user = this._authService.getUser();
        this.userIsManager = user.roles.includes(Role.MANAGER)
        this.userIsConsultantManager = 
          this.userIsManager && mission.consultant.manager.id == user.id;
        this._setTodayVersionIndex();
      },
      () => window.location.replace('not-found')
    )
  }

  public ngAfterContentChecked() : void {
    this._cdr.detectChanges();
  }

  public onNewVersion() : void {
    this._missionService.addVersion(this.mission.id).subscribe(
      () => { this.ngOnInit(); },
      () => { this._handleError(); }
    );
  }

  public updateTodayVersion(update : any) : void {
    this.mission.versions[this.todayVersionIndex][update.key] = update.value;
  }

  public showMissionEdit() : boolean {
    return this.userIsConsultantManager && 
      (this.selectedIndex === this.todayVersionIndex ||
        this.mission.sheetStatus !== SheetStatus.VALIDATED)
  }

  public showVersions() : boolean {
    return this.mission.sheetStatus === SheetStatus.VALIDATED;
  }

  public showNewVersion() : boolean {
    return this.mission.sheetStatus === SheetStatus.VALIDATED
      && this.todayVersionIndex === null;
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

  private _handleError() : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Impossible de créer une nouvelle version',
      message : 'Une erreur s\'est produite lors de la tentative de création d\'une nouvelle version pour cette fiche mission.',
      ok: 'OK'
    };
    this._dialog.open(OkDialogComponent, dialogConfig);
  }
}