import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { Component, OnInit, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { MissionService } from 'src/app/_services/mission.service';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ProjectsEditComponent } from 'src/app/_edit/projects-edit/projects-edit.component';
import { MissionEditComponent } from 'src/app/_edit/mission-edit/mission-edit.component';
import { SheetStatus } from 'src/app/_enums/sheet-status.enum';
import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';

const VALIDATION_STEP : number = 2;

@Component({
  selector: 'app-mission-sheet-page',
  templateUrl: './mission-sheet-page.component.html',
  styleUrls: ['./mission-sheet-page.component.scss']
})
export class MissionSheetPageComponent implements OnInit, AfterContentChecked {
  private _token : string;

  public mission : any;

  @ViewChild('missionEditComponent') missionEdit : MissionEditComponent;
  @ViewChild('projectsEditComponent') projectsEdit : ProjectsEditComponent;

  constructor(
    private _cdr : ChangeDetectorRef,
    private _dialogUtils : DialogUtilsService,
    private _missionService : MissionService,
    private _route : ActivatedRoute,
  ) {}

  ngOnInit() {
    this._token = this._route.snapshot.params['token'];
    this._missionService.getMissionDetailsFromToken(this._token).subscribe(
      mission => this.mission = mission,
      () => window.location.replace('not-found')
    )
  }

  ngAfterContentChecked() : void {
    this._cdr.detectChanges();
  }

  public updateMission(event : any) : void {
    this._missionService
    .updateMissionFromToken(this._token, event.key, event.value).subscribe(
      () => {
        this.mission[event.key] = event.value;
      },
      () => this._dialogUtils.showMsgDialog("Impossible de mettre à jour les données.")
    )
  }

  public createNewProject() : void {
    this._missionService.newProjectFromToken(this._token).subscribe(
      () => this.ngOnInit(),
      () => this._dialogUtils.showMsgDialog("Impossible de créer un nouveau projet.")
    )
  }

  public updateProject(event : any) : void { 
    const projectId = this.mission.lastVersion.projects[event.index].id;
      this._missionService.updateProjectFromToken(this._token, projectId, event.key, event.value).subscribe(
        () => this.mission.lastVersion.projects[event.index][event.key] = event.value,
        () => this._dialogUtils.showMsgDialog("Impossible de mettre à jour le projet.")
      );
  }

  public deleteProject(index : number) : void {
    const projectId = this.mission.lastVersion.projects[index].id;
    this._missionService.deleteProjectFromToken(this._token, projectId).subscribe(
      () => {
        this.mission.lastVersion.projects.splice(index, 1);
        this.projectsEdit.projectsForms[index] = null;
      },
      () => this._dialogUtils.showMsgDialog("Impossible de supprimer le projet.")
    )
  }

  public onAddPicture(event : any) : void {
    this._missionService.uploadProjectPictureFromToken(event.picture, event.project, this._token).subscribe(
      response => {
        if (response instanceof HttpResponse) {
          if (response.status === HttpStatus.OK)
            this.ngOnInit();
          else
            this._dialogUtils.showMsgDialog("Impossible de charger cette image.");
        }
      },
      error => { 
        if (error.status === HttpStatus.BAD_REQUEST)
          this._dialogUtils.showMsgDialog("Le logo n'a pas été chargé, seules les images de moins d'un Mo en .jpg, .png, .gif, .ico et .webp sont acceptées.");
        else
          this._dialogUtils.showMsgDialog("Impossible de charger cette image.");
      }
    );
  }

  public onRemovePicture(event : any) : void {
    this._missionService.removePictureFromProjectFromToken(event.project, this._token).subscribe(
      () => this.ngOnInit(),
      error => console.log(error)
    );
  }

  public addSkillToProject(skill: any){
    this._missionService.addSkillToProjectFromToken(skill.project,[skill.skill], this._token).subscribe(
      () => {},
      () => this._dialogUtils.showMsgDialog("Impossible d'ajouter la compétence.")
    );
  }

  public removeSkillFromProject(skill: any){
    this._missionService.removeSkillFromProjectFromToken(skill.project,skill.skill, this._token).subscribe(
      () => {},
      () => this._dialogUtils.showMsgDialog("Impossible de supprimer la compétence.")
    )
  }

  public onValidate() : void {
    this._missionService.updateMissionFromToken(this._token, 'sheetStatus', SheetStatus.VALIDATED).subscribe(
      () => {
        const dialogRef = this._dialogUtils.showMsgDialog("La fiche a bien été validée et transmise.");
        dialogRef.beforeClosed().subscribe(() => window.location.replace(''));
      }
        ,
      () => this._dialogUtils.showMsgDialog("Impossible de valider la fiche mission.")
    )
  }

  public allFormsValid() : boolean {
    return (!this.missionEdit?.grp) ? false :
    this.missionEdit.grp.valid && this.projectsEdit.allFormsValid();
  }
}
