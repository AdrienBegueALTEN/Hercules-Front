import { AuthService } from 'src/app/_services/auth.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CtrlError } from 'src/app/_enums/ctrl-error.enum';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
})
export class ChangePasswordDialogComponent {
  public hiddenCurrent : boolean = true;
  public hiddenNew  : boolean = true;
  public grp : FormGroup = new FormBuilder().group({
    currentPassword : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    newPassword : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  });

  readonly CURRENT_KEY = 'currentPassword';
  readonly NEW_KEY = 'newPassword';

  constructor(
    private _authService : AuthService,
    private _dialogRef : MatDialogRef<ChangePasswordDialogComponent>
  ) {}

  public onSubmit() : void {
    if (!this.grp.valid) return;
    this._authService.changePassword(
      this.grp.controls[this.CURRENT_KEY].value,
      this.grp.controls[this.NEW_KEY].value).subscribe(
        () => this._dialogRef.close()
      )
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
