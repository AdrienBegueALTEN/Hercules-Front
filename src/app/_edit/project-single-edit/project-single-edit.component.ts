import { AppSettings } from 'src/app/app-settings';
import { CtrlError } from 'src/app/_enums/ctrl-error.enum';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

const SEMANTICS_ERR : string = 'semantics';

/**
 * Component for the parts that serve to modify a single project
 */
export class ErrorController implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && form.touched && control.invalid);
  }
}

/**
 * Component for the parts that serve to modify a single project
 */
@Component({
  selector: 'app-project-single-edit',
  templateUrl: './project-single-edit.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectSingleEditComponent implements OnInit {
  /**
   * Boolean that indicates if the project can be removed
   */
  @Input() canBeDeteled : boolean = false;
  /**
   * Boolean that indicates if the project is updated by the consultant with an external link
   */
  @Input() externalVersion : boolean = false;
  /**
   * Object with the details of the project
   */
  @Input() project : any;

  readonly ENTITLED_KEY : string = 'title';
  readonly ENTITLED_TOOLTIP : string = 'Bref descriptif contenant des mots-clefs représentatifs du projet.';
  readonly DESCRIPTION_KEY : string = 'description';
  readonly DESCRIPTION_TOOLTIP : string = 'Descriptif complet présentant le projet dans sa globalité.';
  readonly DESCRIPTION_MAX_LENGTH : number = 1000;
  readonly BEGIN_KEY : string = 'beginDate';
  readonly BEGIN_TOOLTIP : string = 'Date à laquelle le projet a débuté.';
  readonly END_KEY : string = 'endDate';
  readonly END_TOOLTIP : string = 'Date à laquelle le projet s\'est achevé.';
  readonly TOOLTIP_ICON : string = 'help_outline';
  readonly TOOLTIP_POS : string = 'before';

  /**
   * Form for the project
   */
  public grp : FormGroup;
  /**
   * Path of the picture for the project
   */
  public pictureSrc : string = null;

  /**
   * Error manager for the dates of the period
   */
  errorController = new ErrorController();

  @Output() addPicture = new EventEmitter<any>();
  @Output() addSkillEvent = new EventEmitter<any>();
  @Output() deletion : EventEmitter<void> = new EventEmitter<void>();
  @Output() removePicture = new EventEmitter<void>();
  @Output() removeSkillEvent = new EventEmitter<any>();
  @Output() sendFormGrp = new EventEmitter<FormGroup>();
  @Output() update : EventEmitter<any> = new EventEmitter<any>();

  public ngOnInit() : void {
    if (this.project.picture)
      this.pictureSrc = AppSettings.PROJECT_PICTURE_PATH + this.project.picture;
    this.grp = new FormBuilder().group({
      title: [this.project[this.ENTITLED_KEY], [Validators.required, Validators.maxLength(100)]],
      description: [this.project[this.DESCRIPTION_KEY], [Validators.required, Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)]],
      beginDate: [this.project[this.BEGIN_KEY] , Validators.required],
      endDate: [this.project[this.END_KEY], Validators.required],
    });
    this.sendFormGrp.emit(this.grp);
  }

  /**
   * Function activated when a field is updated and it sends an http request to update the field in the database, it also manages the errors for the dates 
   * @param key name of the field
   */
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
          this.grp.controls[this.BEGIN_KEY].setErrors(null);
          this.grp.controls[this.END_KEY].setErrors(null);
      }
    }

    if (this._doUpdate(key))
      this.update.emit({
        key : key,
        value : this.grp.controls[key].value
      });
  }

  /**
   * Function that indicates if a specific field has been updated
   * @param key name of the field
   * @returns Boolean that indicates if the field has been updated
   */
  private _doUpdate(key : string) : boolean {
      return this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }

  /**
   * Function that returns an error text adapted to the given name field
   * @param key name of the field
   * @returns error text linked to the given field's name
   */
  public getErrorTxt(key : string) : string {
    switch (key) {
      case this.ENTITLED_KEY :
        return this.grp.controls[this.ENTITLED_KEY].hasError(CtrlError.REQUIRED) ?
        'Le titre du projet doit être renseigné.' : '';
      case this.DESCRIPTION_KEY :
        return this.grp.controls[this.DESCRIPTION_KEY].hasError(CtrlError.REQUIRED) ?
        'La description du projet est obligatoire.' : '';
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
