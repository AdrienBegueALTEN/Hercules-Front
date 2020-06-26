import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/**
 * Component for the dialog window for choosing a file's name.
 */
@Component({
  selector: 'app-choose-filename-dialog',
  templateUrl: './choose-filename-dialog.component.html',
  styleUrls: ['./choose-filename-dialog.component.scss']
})
export class ChooseFilenameDialogComponent implements OnInit {

  /**
   * Name of the file chosen by the user
   */
  filename : string;

  /**
   * Form handling the filename
   */
  filenameForm : FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private _dialogRef: MatDialogRef<ChooseFilenameDialogComponent>,
              private _formBuilder: FormBuilder) {

               }

  ngOnInit(): void {
    this.filenameForm = this._formBuilder.group({
        filename : [this.data.filename,[Validators.required,Validators.pattern("[\\_\\-\\!\\?\\.\\+\\(\\)a-zA-Z0-9]+(\.pdf)?")]]
    });

  }

  /**
   * Close the dialog box when this function is called
   */
  onCancel(){
      this._dialogRef.close();
  }

  /**
   * Close the dialog box when this function is called and checks if the content is valid
   */
  onValidate(){
    this._dialogRef.close(this.filenameForm.controls['filename'].value);
  }



}
