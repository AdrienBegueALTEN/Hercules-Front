import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/_services/mission.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';

@Component({
  selector: 'app-mission-sheet-page',
  templateUrl: './mission-sheet-page.component.html',
  styleUrls: ['./mission-sheet-page.component.scss']
})
export class MissionSheetPageComponent implements OnInit {
  mission : any;
  private _token : string;

  constructor(
    private _dialog : MatDialog,
    private _missionService : MissionService,
    private _route : ActivatedRoute,
  ) {}

  ngOnInit() {
    this._token = this._route.snapshot.params['token'];
    this._missionService.getMissionDetailsFromToken(this._token).subscribe(
      mission => { this.mission = mission },
      err => console.log(err)
    )
  }

  public updateMission(event : any) : void {
    this._missionService
    .updateMissionFromToken(this._token, event.key, event.value).subscribe(
      () => {
        this.mission[event.key] = event.value;
      },
      () => { this._handleError(); }
    )
  }
  
  private _handleError() : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Modification impossible',
      message : 'Une erreur s\'est produite.',
      ok: 'OK'
    };
    this._dialog.open(OkDialogComponent, dialogConfig);
  }
}
