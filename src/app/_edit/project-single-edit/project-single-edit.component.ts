import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as sha1 from 'js-sha1';
import { HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionService } from 'src/app/_services/mission.service';

@Component({
  selector: 'app-project-single-edit',
  templateUrl: './project-single-edit.component.html'
})
export class ProjectSingleEditComponent implements OnInit {
  @Input() canBeDeteled : boolean = false;
  @Input() externalVersion : boolean = false;
  @Input() project : any;

  readonly ENTITLED_KEY : string = "title";
  readonly ENTITLED_TOOLTIP : string = "Bref descriptif contenant des mots-clefs représentatifs du projet.";
  readonly DESCRIPTION_KEY : string = "description";
  readonly DESCRIPTION_TOOLTIP : string = "Descritpif complet présentant le projet dans sa globalité.";
  readonly BEGIN_KEY : string = "beginDate";
  readonly BEGIN_TOOLTIP : string = "Date à laquelle le projet à débuté.";
  readonly END_KEY : string = "endDate";
  readonly END_TOOLTIP : string = "Date à laquelle le projet s'est achevé.";
  readonly TOOLTIP_ICON = 'help_outline';
  readonly TOOLTIP_POS = 'before';

  grp : FormGroup;
  selectedFiles: FileList;
  currentFileRealName = 'Choisir un fichier en cliquant ici.';
  srcPic;

  @Output() update : EventEmitter<any> = new EventEmitter<any>();
  @Output() deletion : EventEmitter<void> = new EventEmitter<void>();
  @Output() image : EventEmitter<any> = new EventEmitter<any>();
  @Output() addSkillEvent = new EventEmitter<any>();
  @Output() removeSkillEvent = new EventEmitter<any>()

  constructor(private _missionService: MissionService) {}

  public ngOnInit() : void {
    this.srcPic = 'http://localhost:8080/hercules/missions/projects/picture/'+this.project.picture;
    this.grp = new FormBuilder().group({
      title: [this.project[this.ENTITLED_KEY]],
      description: [this.project[this.DESCRIPTION_KEY]],
      beginDate: [this.project[this.BEGIN_KEY] ? 
        new Date(this.project[this.BEGIN_KEY]).toISOString().substr(0, 10) :
        null, Validators.required],
      endDate: [this.project[this.END_KEY] ? 
        new Date(this.project[this.END_KEY]).toISOString().substr(0, 10) :
        null, Validators.required],
    });
  }

  public onChange(key : string) : void {
    if (this._doUpdate(key))
      this.update.emit({
        key : key,
        value : this.grp.controls[key].value
      });
  }

  public onDelete() : void {
    this.deletion.emit();
  }

  private _doUpdate(key : string) : boolean {
      return this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileRealName = this.selectedFiles.item(0).name;
  }

  upload() {
    let name = sha1(this.project.title+this.project.id+"logo");
    let extension = this.selectedFiles.item(0).name.split('.').pop(); 
    let renamedFile = new File([this.selectedFiles.item(0)],name+'.'+extension);
    this.image.emit({
        file:renamedFile,
        project:this.project.id
    });
  }
 }
