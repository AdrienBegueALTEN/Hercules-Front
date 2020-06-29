import { DateUtilsService } from './../../_services/utils/dateUtils.service';
import { HttpStatus } from './../../_enums/http-status.enum';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CtrlError } from 'src/app/_enums/ctrl-error.enum';

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html'
})
export class ConsultantEditComponent implements OnInit {
  @Input() consultant : any;

  readonly EMAIL_KEY = 'email';
  readonly FIRSTNAME_KEY = 'firstname';
  readonly LASTNAME_KEY = 'lastname';
  readonly XP_KEY = 'experience';

  showNewDiploma : boolean = false;
  grp : FormGroup = new FormBuilder().group({});

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

  addCtrl(key : string, ctrl : FormControl) : void {
    this.grp.addControl(key, ctrl);
  }

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

  private _doUpdate(key : string) {
    return this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }

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

  updateManager(manager : any) {
    console.log(manager.id)
    this._consultantService.updateConsultant(this.consultant.id,'manager', manager.id).subscribe(
      () => {
        this.consultant['manager'] = manager;
        this._snackBar.open('Mise à jour effectuée', 'x', {duration: 2000});
        this.reload.emit()
      },
      error => { this._handleError(error.status); console.log(error); } 
    )
  }
  
  sendReload() {
    this.ngOnInit();
    this.reload.emit();
  }

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

  public managerIsActive() : boolean {
    return this._dateUtils.userIsActive(this.consultant.manager);
  }
}
