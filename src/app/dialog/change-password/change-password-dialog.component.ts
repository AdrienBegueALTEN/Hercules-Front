import { AuthService } from 'src/app/_services/auth.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder, ValidatorFn, FormControl } from '@angular/forms';
import { CtrlError } from 'src/app/_enums/ctrl-error.enum';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
})
export class ChangePasswordDialogComponent {
  public hiddenCurrent : boolean = true;
  public hiddenNew  : boolean = true;
  public grp : FormGroup = new FormBuilder().group({});

  readonly CURRENT_KEY = 'currentPassword';
  readonly NEW_KEY = 'newPassword';

  constructor(
    private _dialogRef : MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newPassword : boolean = false)
  {
    const passwordValidators : ValidatorFn[] = [Validators.required, Validators.minLength(8), Validators.maxLength(16)];
    this.grp.addControl(this.NEW_KEY, new FormControl('', passwordValidators));
    if (!this.newPassword)
      this.grp.addControl(this.CURRENT_KEY, new FormControl('', passwordValidators));
  }

  public onSubmit() : void {
    if (!this.grp.valid) return;
    let response : any = {
      newPassword: this.grp.controls[this.NEW_KEY].value
    };
    if (!this.newPassword)
      response.currentPassword = this.grp.controls[this.CURRENT_KEY].value;
    this._dialogRef.close(response);
  }

  public getErrorText(key : string) : string {
    switch (key) {
      case this.CURRENT_KEY:
      case this.NEW_KEY:
        return  this.grp.controls[key].hasError(CtrlError.REQUIRED) ? 'Ce champ est obligatoire.' :
        this.grp.controls[key].hasError(CtrlError.MIN_LENGTH) ? 'Le mot de passe est trop court.' :
        this.grp.controls[key].hasError(CtrlError.MAX_LENGTH) ? 'Le mot de passe est trop long.' : '';
      default : return '';
    }
  }

}
