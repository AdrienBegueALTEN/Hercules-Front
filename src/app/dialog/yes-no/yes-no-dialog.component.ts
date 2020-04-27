import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent {
  title : string;
  message : string;
  yes : string;
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
