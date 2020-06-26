import { FormControl } from '@angular/forms';
import { NewUserComponent } from '../../_input/new-user/new-user.component';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for a dialog window that serves to create a new user 
 */
@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html'
})
export class NewUserDialogComponent {

  /**
   * Type of the user : manager, consultant or recruitment officer
   */
  public label : string;

  /**
   * Form for the administration rights
   */
  public adminCtrl : FormControl;

  /**
   * Child component for the inputs
   */
  @ViewChild('newUser') newUser: NewUserComponent;

  constructor(
    private _dialogRef: MatDialogRef<NewUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) {
      this.label = data?.label || '?';
      if (data?.newManager)
       this.adminCtrl = new FormControl(false);
    }
  
  /**
  * Function activated when the submit button is clicked and it closes the window and sends the inputs if it is valid.
  */
  public onSubmit() : void {
    if (!this.newUser.grp.valid)
      this._dialogRef.close();
    let user : any = {
      firstname: this.newUser.grp.controls['firstname'].value,
      lastname: this.newUser.grp.controls['lastname'].value,
      email: this.newUser.grp.controls['email'].value
    };
    if (!!this.adminCtrl)
      user.isAdmin = this.adminCtrl.value;
    this._dialogRef.close(user);
  }
}
