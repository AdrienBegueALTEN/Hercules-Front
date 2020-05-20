import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/_services/mission.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { HttpResponse } from '@angular/common/http';

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
      mission => this.mission = mission ,
      () => window.location.replace('not-found')
    )
  }

  public updateMission(event : any) : void {
    this._missionService
    .updateMissionFromToken(this._token, event.key, event.value).subscribe(
      () => {
        this.mission[event.key] = event.value;
      },
      () => this._showErrorDialog("Impossible de mettre à jour les données.")
    )
  }

  public createNewProject() : void {
    this._missionService.newProjectFromToken(this._token).subscribe(
      () => this.ngOnInit(),
      () => this._showErrorDialog("Impossible de créer un nouveau projet.")
    )
  }

  public updateProject(event : any) : void { 
    const projectId = this.mission.lastVersion.projects[event.index].id;
      this._missionService.updateProjectFromToken(this._token, projectId, event.key, event.value).subscribe(
        () => this.mission.lastVersion.projects[event.index][event.key] = event.value,
        err => this._showErrorDialog("Impossible de mettre à jour le projet.")
      );
  }

  public deleteProject(index : number) : void {
    const projectId = this.mission.lastVersion.projects[index].id;
    this._missionService.deleteProjectFromToken(this._token, projectId).subscribe(
      () => this.mission.lastVersion.projects.splice(index, 1),
      () => this._showErrorDialog("Impossible de supprimer le projet.")
    )
  }
  
  private _showErrorDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

  public addImage(imageFile){
    this._missionService.uploadFromToken(imageFile.file, imageFile.project).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          if(event.status==200){
            this.ngOnInit();
          }
          else
            this._showErrorDialog("Impossible de charger cette image.");
        }
      },
      err => {
        console.log(err);
        this._showErrorDialog("Impossible de charger cette image.");
      });
  }
}
