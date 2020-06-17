import { isUndefined } from 'util';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html'
})
export class DeactivateComponent {
  public ctrl : FormControl;

  constructor(
    private _dialogRef: MatDialogRef<DeactivateComponent>,
    @Inject(MAT_DIALOG_DATA) public user : any) {
      if (isUndefined(user.releaseDate)) user.releaseDate = null;
      this.ctrl = new FormControl(this.user.releaseDate !== null ?
      this.user.releaseDate : new Date().toISOString().substr(0, 10));
    };

  onSubmit(releaseDate : string = null){
    this._dialogRef.close(releaseDate);
  }
}
