import { NewUserComponent } from './../../_input/new-user/new-user.component';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html'
})
export class NewUserDialogComponent {

  @ViewChild('newUser') newUser: NewUserComponent;

  constructor(
    private _dialogRef: MatDialogRef<NewUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public label : string) {}

  public onSubmit() : void {
    this._dialogRef.close(this.newUser.grp);
  }

}
