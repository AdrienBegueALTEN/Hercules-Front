import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

/**
 * Customizes the content of the yes no dialog box
 */
@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html'
})
export class YesNoDialogComponent {

 
  /**
   * Title of the message box
   */
  title : string;

  /**
   * Body of the textbox
   */
  message : string;

  /**
   * Text displayed in the button to confirm the action
   */
  yes : string;

  /**
   * Text displayed in the button to cancel the action
   */
  no : string;

  constructor(
    private _dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.title = data.title;
      this.message = data.message;
      this.yes = data.yes;
      this.no = data.no;
    }

  /**
   * Function activated if the cancel button is clicked and it closes the window and sends false
   */
  onNo() : void { this._dialogRef.close(false); }
  /**
   * Function activated if the confirmation button is clicked and it closes the window and sends true
   */
  onYes() : void { this._dialogRef.close(true); }

}
