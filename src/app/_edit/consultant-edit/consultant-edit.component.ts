import { DateUtilsService } from './../../_services/utils/dateUtils.service';
import { HttpStatus } from './../../_enums/http-status.enum';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CtrlError } from 'src/app/_enums/ctrl-error.enum';

/**
 * Component for the parts that serve to modify a consultant
 */
@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html'
})
export class ConsultantEditComponent implements OnInit {
  /**
   * Object with the details of the consultant
   */
  @Input() consultant : any;

  /**
   * Email key used when fetching data from API
   */
  readonly EMAIL_KEY = 'email';
  /**
   * First name key used when fetching data from API
   */
  readonly FIRSTNAME_KEY = 'firstname';
  /**
   * Last name key used when fetching data from API
   */
  readonly LASTNAME_KEY = 'lastname';
  /**
   * Experience key used when fetching data from API
   */
  readonly XP_KEY = 'experience';

  /**
   * Boolean that indicates if the inputs to add a new diploma has to be shown or not
   */
  showNewDiploma : boolean = false;

  /**
   * Form for a consultant
   */
  grp : FormGroup = new FormBuilder().group({});

  /**
   * Event is emitted to reload the consultant informations
   * It's used when the consultant informations are updated
   */
  @Output() reload = new EventEmitter<any>();

  constructor(
    private _consultantService : ConsultantService,
    private _dialog : MatDialog,
    private _snackBar: MatSnackBar,
    private _dateUtils : DateUtilsService
  ) { }

  public ngOnInit(): void {
    this.grp.addControl(this.XP_KEY, new FormControl(this.consultant[this.XP_KEY], [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^\\d*$')]))
  }

  /**
   * Function that adds a new field to the form
   * @param key name of the field
   * @param ctrl FormControl for the field
   */
  addCtrl(key : string, ctrl : FormControl) : void {
    this.grp.addControl(key, ctrl);
  }

  /**
   * Function activated when a field is updated and it sends an http request to update the field of the consultant in the database
   * @param key name of the field
   */
  valueChange(key : string) : void {
    if (!this._doUpdate(key))
      return;
    const newValue : any = (key === this.XP_KEY) ? 
      Number(this.grp.controls[key].value) : this.grp.controls[key].value;
    this._consultantService
      .updateConsultant(this.consultant.id, key, newValue).subscribe(
        () => {
          this.consultant[key] = newValue;
          this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
        },
        error => { this._handleError(error.status); console.log(error); }
      )
  }
  /**
   * Function that verifies if a specific field has been updated
   * @param key name of the field
   */
  private _doUpdate(key : string) {
    return this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }

  /**
   * Function that opens a window to display an error message depending on the status of the request
   * @param status Status of the response from an http request 
   */
  private _handleError(status : number) : void {
    let message : string;
    switch(status) {
      case HttpStatus.CONFLICT :
        message = 'Cette adresse mail est indisponible.';
        break;
      default :
        message = 'Impossible de mettre à jour ce champ.';
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = 'Echec de la modification : '+message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

  /**
   * Function that updates the manager of the consultant in the database with an http request
   * @param manager object with the details of the manager
   */
  updateManager(manager:any){
    this._consultantService.updateConsultant(this.consultant.id,'manager',manager.id).subscribe(
      () => {
        this.consultant['manager'] = manager;
        this._snackBar.open('Mise à jour effectuée', 'x', {duration: 2000});
        this.reload.emit()
      },
      error => { this._handleError(error.status); console.log(error); } 
    )
  }
  
  /**
   * Function that refreshes the page
   */
  sendReload() {
    this.ngOnInit();
    this.reload.emit();
  }

  /**
   * Function that returns an error message depending on what is the error and the name of the given field
   * @param key name of the field
   * @returns error message or an empty string
   */
  public getErrorTxt(key : string) : string {
    switch (key) {
      case this.XP_KEY :
        return this.grp.controls[this.XP_KEY].hasError(CtrlError.REQUIRED) ?
          'Le niveau d\'expérience doit être renseigné.' :
          this.grp.controls[this.XP_KEY].hasError(CtrlError.MIN) ? 
            'Le niveau d\'expérience doit être strictement positif.' : '';
      default :
        return "";
    }
  }

  /**
   * Checks whether a manager is active
   */
  public managerIsActive() : boolean {
    return this._dateUtils.userIsActive(this.consultant.manager);
  }
}
