import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html'
})
export class DeactivateComponent {
  ctrl : FormControl = new FormControl(new Date().toISOString().substr(0, 10));

  constructor(
    private _dialogRef: MatDialogRef<DeactivateComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) {};

  onSubmit(){
    this._dialogRef.close(this.ctrl.value);
  }
}
