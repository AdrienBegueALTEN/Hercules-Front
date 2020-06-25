import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
   * Text displayed if user wants to confirm last action
   */
  yes : string;

  /**
   * Text displayed if user wants to undo last action
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

  onNo() : void { this._dialogRef.close(false); }
  onYes() : void { this._dialogRef.close(true); }

}
