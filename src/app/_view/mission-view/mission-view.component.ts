import { AuthService } from 'src/app/_services/auth.service';
import { MissionService } from '../../_services/mission.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../_enums/role.enum';

@Component({
  selector: 'app-mission-view',
  templateUrl: './mission-view.component.html',
  styleUrls: ['./mission-view.component.scss']
})
export class MissionViewComponent implements OnInit {

  mission : any;
  writingRights : boolean = false;

  constructor(
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
}
