import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-choose-filename-dialog',
  templateUrl: './choose-filename-dialog.component.html',
  styleUrls: ['./choose-filename-dialog.component.scss']
})
export class ChooseFilenameDialogComponent implements OnInit {

  filename : string;
  filenameForm : FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private _dialogRef: MatDialogRef<ChooseFilenameDialogComponent>,
              private _formBuilder: FormBuilder) {

               }

  ngOnInit(): void {
    this.filenameForm = this._formBuilder.group({
        filename : [this.data.filename,Validators.required]
    });

  }

  onCancel(){
      this._dialogRef.close();
  }

  onValidate(){
    this._dialogRef.close(this.filenameForm.controls['filename'].value);
  }

}
