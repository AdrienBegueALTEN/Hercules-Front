import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/_services/mission.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mission-sheet-page',
  templateUrl: './mission-sheet-page.component.html',
  styleUrls: ['./mission-sheet-page.component.scss']
})
export class MissionSheetPageComponent implements OnInit {

  mission : any;
  private _token : string;

  constructor(
    private _missionService : MissionService,
    private _route : ActivatedRoute
  ) {}

  ngOnInit() {
    this._token = this._route.snapshot.params['token'];
    this._missionService.getMissionDetailsFromToken(this._token).subscribe(
      mission => {this.mission = mission ; console.log(mission)},
      err => console.log(err)
    )
  }

}
