import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-release-date-dialog',
  templateUrl: './release-date-dialog.component.html',
  styleUrls: ['./release-date-dialog.component.scss']
})
export class ReleaseDateDialogComponent {

  date : String
  title : string;
  message : string;
  yes : string;
  no : string;
  releaseDateForm : FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<ReleaseDateDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
      this.title = data.title;
      this.message = data.message;
      this.yes = data.yes;
      this.no = data.no;
      this.initForm();
    }
    
    initForm() : void {
      this.releaseDateForm = this._formBuilder.group({
        releaseDate : ['',Validators.required]
      });
    }

    onNo() : void { this._dialogRef.close(false); }
    onYes() : void { this._dialogRef.close(this.date); }

    onRelease() : void {
        const releaseDate = this.releaseDateForm.get('releaseDate').value;
        this.date = releaseDate;
    }
 
}
