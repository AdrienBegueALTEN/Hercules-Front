import { MissionService } from './../_services/mission.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mission-view',
  templateUrl: './mission-view.component.html',
  styleUrls: ['./mission-view.component.scss']
})
export class MissionViewComponent implements OnInit {

  mission : any;

  constructor(
    private _missionService : MissionService,
    private _route : ActivatedRoute
  ) {}

  ngOnInit() {

    const id : number = this._route.snapshot.params['id'];
    this._missionService.getMissionDetails(id).subscribe(
      mission => this.mission = mission,
      () => window.location.replace('not-found')
    )
  }

}
