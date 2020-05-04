import { AuthService } from 'src/app/_services/auth.service';
import { MissionService } from '../../_services/mission.service';
import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../_enums/role.enum';

@Component({
  selector: 'app-mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss']
})
export class MissionPageComponent implements OnInit, AfterContentChecked {
  mission : any;
  selectedIndex : number = 0;
  writingRights : boolean = false;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService : AuthService,
    private _missionService : MissionService,
    private _route : ActivatedRoute
  ) {}

  ngOnInit() {
    const id : number = this._route.snapshot.params['id'];
    this._missionService.getMissionDetails(id).subscribe(
      mission => {
        this.mission = mission;
        const user = this._authService.getUser();
        this.writingRights = 
          user.roles.includes(Role.MANAGER) && mission.consultant.manager == user.id;
      },
      () => window.location.replace('not-found')
    )
  }

  ngAfterContentChecked() : void {
    this._cdr.detectChanges();
  }

  public canEditSelectedVersion() : boolean {
      const today : Date = new Date();
      const versionDate : Date = this.mission.versions[this.selectedIndex];
      return this.writingRights &&
      today.getFullYear === versionDate.getFullYear &&
      today.getMonth === versionDate.getMonth &&
      today.getDay === versionDate.getDay;
  }
}
