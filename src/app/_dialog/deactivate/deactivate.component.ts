import { isUndefined } from 'util';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for the dialog window for putting/modifying/deleting the release date of an user.
 */
@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html'
})
export class DeactivateComponent {

  /**
   * Form with the release date
   */
  public ctrl : FormControl;

  constructor(
    private _dialogRef: MatDialogRef<DeactivateComponent>,
    @Inject(MAT_DIALOG_DATA) public user : any) {
      if (isUndefined(user.releaseDate)) user.releaseDate = null;
      this.ctrl = new FormControl(this.user.releaseDate !== null ?
      this.user.releaseDate : new Date().toISOString().substr(0, 10));
    };

  /**
   * Function that close the window and sends the release date.
   * @param releaseDate Release date in the field or null if the user want to delete it.
   */
  onSubmit(releaseDate : string = null){
    this._dialogRef.close(releaseDate);
  }
}
