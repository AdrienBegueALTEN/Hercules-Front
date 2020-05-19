import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as sha1 from 'js-sha1';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionService } from 'src/app/_services/mission.service';

@Component({
  selector: 'app-project-single-edit',
  templateUrl: './project-single-edit.component.html'
})
export class ProjectSingleEditComponent implements OnInit {
  @Input() project : any;

  readonly TITLE_KEY : string = "title";
  readonly DESCRIPTION_KEY : string = "description";
  readonly BEGIN_KEY : string = "beginDate";
  readonly END_KEY : string = "endDate";

  grp : FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  currentFileRealName = 'Choisir un fichier en cliquant ici.';
  message = '';
  srcPic;

  @Output() update : EventEmitter<any> = new EventEmitter<any>();
  @Output() deletion : EventEmitter<void> = new EventEmitter<void>();


  constructor(private _missionService: MissionService) {}

  public ngOnInit() : void {
    this.srcPic = 'http://localhost:8080/hercules/missions/projects/picture/'+this.project.picture;
    this.grp = new FormBuilder().group({
      title: [this.project[this.TITLE_KEY]],
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
    this.currentFile = renamedFile;
    this._missionService.upload(this.currentFile, this.project.id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          if(event.status==200){
            this.message = "Le fichier est chargé.";
            this.project.picture = name+'.'+extension;
            this.srcPic = 'http://localhost:8080/hercules/missions/projects/picture/'+this.project.picture;
            this.ngOnInit();
          }
          else
            this.message  ="Une erreur est survenu ("+event.status+").";
        }
      },
      err => {
        this.message = 'Le fichier n\'a pas été chargé !';
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }
 }
