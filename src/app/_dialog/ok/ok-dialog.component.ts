import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for a dialog window that serves to display a message with a validation button
 */
@Component({
  selector: 'app-ok-dialog',
  templateUrl: './ok-dialog.component.html',
  styleUrls: ['./ok-dialog.component.scss']
})
export class OkDialogComponent {

  /**
   * Title displayed in the window
   */
  title : string;

  /**
   * Message in the window
   */
  message : string;

  /**
   * Text written on the button
   */
  ok : string;

  constructor(
    private _dialogRef: MatDialogRef<OkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.title = data.title;
      this.message = data.message;
      this.ok = data.ok;
    }
  
  /**
   * Function activated when the validation button is clicked and it closes the window
   */
  onOk() : void { this._dialogRef.close(); }

}