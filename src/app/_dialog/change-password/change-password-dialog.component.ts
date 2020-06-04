import { HttpStatus } from './../../_enums/http-status.enum';
import { AuthService } from './../../_services/auth.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { CtrlError } from 'src/app/_enums/ctrl-error.enum';
import { Md5 } from 'ts-md5/dist/md5';

const CONST_NEW : string = 'newPassword';
const CONST_CONFIRMATION : string = 'confirmation';

export function checkConfirmation (ctrl : AbstractControl) {
  let res : any = 
    (ctrl.get(CONST_NEW).value === ctrl.get(CONST_CONFIRMATION).value) ?
      null : {unconfirmed: true};
  ctrl.get(CONST_CONFIRMATION).setErrors(res);
  return res;
 }

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
})
export class ChangePasswordDialogComponent {
  public hiddenCurrent : boolean = true;
  public hiddenNew  : boolean = true;
  public grp : FormGroup = new FormBuilder().group({});
  public wrongPassword : boolean = false;

  readonly CONFIRMATION_KEY = CONST_CONFIRMATION;
  readonly CURRENT_KEY = 'currentPassword';
  readonly NEW_KEY = CONST_NEW;

  constructor(
    private _authService : AuthService,
    private _dialogRef : MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user : number = null) {
    this.grp.addControl(this.NEW_KEY, new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]));
    this.grp.addControl(this.CONFIRMATION_KEY, new FormControl(''));
    this.grp.setValidators(checkConfirmation);
    if (!!this.user)
      this.grp.addControl(this.CURRENT_KEY, new FormControl('', [Validators.required]));
  }

  public onSubmit() : void {
    const newPassword : string = (String)(Md5.hashStr(this.grp.controls[this.NEW_KEY].value));
    if (!!this.user) {
      const currentPassword : string = (String)(Md5.hashStr(this.grp.controls[this.CURRENT_KEY].value));
      this._authService.changePassword(currentPassword, newPassword).subscribe(
        () => this._dialogRef.close(true),
        (error) => this._handleSubmitError(error)
      )
    } else this._dialogRef.close(newPassword);
  }

  public getErrorText(key : string) : string {
    switch (key) {
      case this.NEW_KEY:
        return this.grp.controls[key].hasError(CtrlError.REQUIRED) ? 'Le nouveau mot de passe doit être renseigné.' :
        this.grp.controls[key].hasError(CtrlError.MIN_LENGTH) ? 'Le nouveau mot de passe est trop court.' :
        this.grp.controls[key].hasError(CtrlError.MAX_LENGTH) ? 'Le nouveau mot de passe est trop long.' : '';
      default : return '';
    }
  }

  public canSubmit() : boolean {
    return this.grp.controls[this.NEW_KEY].valid &&
      (this.user === null || this.grp.controls[this.CURRENT_KEY].valid) &&
      (!this.hiddenNew || this.grp.controls[this.CONFIRMATION_KEY].valid);
  }

  private _handleSubmitError(error : Response) : void {
    if (error.status == HttpStatus.FORBIDDEN) {
      this.wrongPassword = true; console.log(true)
    } else this._dialogRef.close(false);
  }
}
