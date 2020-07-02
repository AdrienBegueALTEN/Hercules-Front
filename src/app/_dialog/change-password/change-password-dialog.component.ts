import { HttpStatus } from './../../_enums/http-status.enum';
import { AuthService } from './../../_services/auth.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { CtrlError } from 'src/app/_enums/ctrl-error.enum';
import { Md5 } from 'ts-md5/dist/md5';

const CONST_NEW : string = 'newPassword';
const CONST_CONFIRMATION : string = 'confirmation';
const PASSWORD_PATTERN : string = '(?=.*\\d)(?=.*[a-zA-Z])(?=.*[#{}\\[\\]()<>@%$+*\\-_~/!?])([a-zA-Z\\d#{}\\[\\]()<>@%$+*\\-_~/!?]{8,16})';

export function checkConfirmation (ctrl : AbstractControl) {
  let res : any = 
    (ctrl.get(CONST_NEW).value === ctrl.get(CONST_CONFIRMATION).value) ?
      null : {unconfirmed: true};
  ctrl.get(CONST_CONFIRMATION).setErrors(res);
  return res;
 }

 /**
  * Component for the dialog window for modifying a password
  */
@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
})
export class ChangePasswordDialogComponent {
  /**
   * True : Current password is hidden
   * False : Current password is shown
   */
  public hiddenCurrent : boolean = true;

  /**
   * True : New password is hidden
   * False : New password is shown
   */
  public hiddenNew  : boolean = true;
  /**
   * Form builder for changing password
   */
  public grp : FormGroup = new FormBuilder().group({});

  /**
   * True : Entered password doesn't match current password
   * False : Entered password matches the current password
   */
  public wrongPassword : boolean = false;

  /**
   * Variable confirming the user typed the password and the confirmation right
   */
  readonly CONFIRMATION_KEY = CONST_CONFIRMATION;
  /**
   * Current password key
   */
  readonly CURRENT_KEY = 'currentPassword';
  /**
   * When new password is set, sets the value of NEW_KEY
   */
  readonly NEW_KEY = CONST_NEW;

  constructor(
    private _authService : AuthService,
    private _dialogRef : MatDialogRef<ChangePasswordDialogComponent>,
    /**
     * User ID involved in the changing password process
     */
    @Inject(MAT_DIALOG_DATA) public user : number = null) {
    this.grp.addControl(this.NEW_KEY, new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(PASSWORD_PATTERN)]));
    this.grp.addControl(this.CONFIRMATION_KEY, new FormControl(''));
    this.grp.setValidators(checkConfirmation);
    if (!!this.user)
      this.grp.addControl(this.CURRENT_KEY, new FormControl('', [Validators.required]));
  }

  /**
   * Sends a http request to the API to change the password with the inputs
   */
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

  /**
   * Functions that returns an error string adapted to the given field's name and the errors.
   * @param key Name of field in the FormControl
   * @returns error text linked to the given field's name
   */
  public getErrorText(key : string) : string {
    switch (key) {
      case this.NEW_KEY:
        return this.grp.controls[key].hasError(CtrlError.REQUIRED) ? 'Le nouveau mot de passe est obligatoire.' :
        this.grp.controls[key].hasError(CtrlError.MIN_LENGTH) ? 'Le nouveau mot de passe doit contenir au moins 6 caractères.' :
        this.grp.controls[key].hasError(CtrlError.MAX_LENGTH) ? 'Le nouveau mot de passe ne peut pas contenir plus de 16 caractères' : 
        this.grp.controls[key].hasError(CtrlError.PATTERN) ? 'Le nouveau mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial.' : '';
      default : return '';
    }
  }

  /**
   * Function that returns a boolean that indicates if the user can use the submit button.
   * @returns True : User can submit the form because the content and password length are valid <br> False : User can't submit the form
   */
  public canSubmit() : boolean {
    return this.grp.controls[this.NEW_KEY].valid &&
      (this.user === null || this.grp.controls[this.CURRENT_KEY].valid) &&
      (!this.hiddenNew || this.grp.controls[this.CONFIRMATION_KEY].valid);
  }

  /**
   * Function that receives an error and if it has a status forbidden it will keep the window open and else close it
   * @param error Error received by the API
   */
  private _handleSubmitError(error : Response) : void {
    if (error.status == HttpStatus.FORBIDDEN) {
      this.wrongPassword = true; console.log(true)
    } else this._dialogRef.close(false);
  }
}
