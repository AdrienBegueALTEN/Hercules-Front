import { CtrlError } from 'src/app/_enums/ctrl-error.enum';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as sha1 from 'js-sha1';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const SEMANTICS_ERR : string = 'semantics';

@Component({
  selector: 'app-project-single-edit',
  templateUrl: './project-single-edit.component.html'
})
export class ProjectSingleEditComponent implements OnInit {
  @Input() canBeDeteled : boolean = false;
  @Input() externalVersion : boolean = false;
  @Input() project : any;

  readonly ENTITLED_KEY : string = 'title';
  readonly ENTITLED_TOOLTIP : string = 'Bref descriptif contenant des mots-clefs représentatifs du projet.';
  readonly DESCRIPTION_KEY : string = 'description';
  readonly DESCRIPTION_TOOLTIP : string = 'Descritpif complet présentant le projet dans sa globalité.';
  readonly BEGIN_KEY : string = 'beginDate';
  readonly BEGIN_TOOLTIP : string = 'Date à laquelle le projet a débuté.';
  readonly END_KEY : string = 'endDate';
  readonly END_TOOLTIP : string = 'Date à laquelle le projet s\'est achevé.';
  readonly TOOLTIP_ICON = 'help_outline';
  readonly TOOLTIP_POS = 'before';

  grp : FormGroup;
  selectedFiles: FileList;
  currentFileRealName = 'Parcourir...';
  srcPic;

  @Output() update : EventEmitter<any> = new EventEmitter<any>();
  @Output() deletion : EventEmitter<void> = new EventEmitter<void>();
  @Output() image : EventEmitter<any> = new EventEmitter<any>();
  @Output() addSkillEvent = new EventEmitter<any>();
  @Output() removeSkillEvent = new EventEmitter<any>()

  constructor() {}

  public ngOnInit() : void {
    this.srcPic = 'http://localhost:8080/hercules/missions/projects/picture/'+this.project.picture;
    this.grp = new FormBuilder().group({
      title: [this.project[this.ENTITLED_KEY], Validators.required],
      description: [this.project[this.DESCRIPTION_KEY], Validators.required],
      beginDate: [this.project[this.BEGIN_KEY] ? 
        new Date(this.project[this.BEGIN_KEY]).toISOString().substr(0, 10) :
        null, Validators.required],
      endDate: [this.project[this.END_KEY] ? 
        new Date(this.project[this.END_KEY]).toISOString().substr(0, 10) :
        null, Validators.required],
    });
  }

  public onChange(key : string) : void {
    if ((key === this.BEGIN_KEY || key === this.END_KEY) 
        && !!this.grp.controls[this.BEGIN_KEY].value && !!this.grp.controls[this.END_KEY].value) {
      const begin : Date = new Date(this.grp.controls[this.BEGIN_KEY].value);
      const end : Date = new Date(this.grp.controls[this.END_KEY].value);
      if (begin >= end) {
        this.grp.controls[this.BEGIN_KEY].setErrors({SEMANTICS_ERR : true});
        this.grp.controls[this.END_KEY].setErrors({SEMANTICS_ERR : true});
        return;
      } else {
        delete this.grp.controls[this.BEGIN_KEY].errors[SEMANTICS_ERR];
        delete this.grp.controls[this.END_KEY].errors[SEMANTICS_ERR];
      }
    }

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

  public getErrorTxt(key : string) : string {
    switch (key) {
      case this.ENTITLED_KEY :
        return 'L\'intitulé du projet est obligatoire.'
      case this.DESCRIPTION_KEY :
        return 'La description du projet est obligatoire.'
      case this.BEGIN_KEY :
        return this.grp.controls[this.BEGIN_KEY].hasError(CtrlError.REQUIRED) ?
          'La date de début du projet doit être renseignée.' :
          'La date de début du projet doit être strictement antérieure à sa date de fin.'
      case this.END_KEY :
        return this.grp.controls[this.END_KEY].hasError(CtrlError.REQUIRED) ?
          'La date de fin du projet doit être renseignée.' :
          'La date de fin du projet doit être strictement postérieure à sa date de départ.'
      default :
        return "";
    }
  }
 }
