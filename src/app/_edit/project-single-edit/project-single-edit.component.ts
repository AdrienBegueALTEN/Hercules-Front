import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/_services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-single-edit',
  templateUrl: './project-single-edit.component.html'
})
export class ProjectSingleEditComponent implements OnInit {
  @Input() project : any;

  readonly TITLE_KEY : string = "title";
  readonly DESCRIPTION_KEY : string = "description";
  readonly BEGIN_KEY : string = "beginDate";
  readonly END_KEY : string = "endDate";

  grp : FormGroup;

  @Output() update : EventEmitter<any> = new EventEmitter<any>();
  @Output() deletion : EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public ngOnInit() : void {
    this.grp = new FormBuilder().group({
      title: [this.project[this.TITLE_KEY]],
      description: [this.project[this.DESCRIPTION_KEY]],
      beginDate: [this.project[this.BEGIN_KEY]],
      endDate: [this.project[this.END_KEY]]
    });
  }

  public onChange(key : string) : void {
    if (this._doUpdate(key))
      this.update.emit({
        key : key,
        value : this.grp.controls[key].value
      });
  }

  public onDelete() : void {
    this.deletion.emit();
  }

  private _doUpdate(key : string) : boolean {
      return this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }
 }
