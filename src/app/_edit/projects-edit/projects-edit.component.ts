import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { YesNoDialogComponent } from 'src/app/_dialog/yes-no/yes-no-dialog.component';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsEditComponent  {
  @Input() externalVersion : boolean = false;
  @Input() projects : any [];

  public projectsForms : FormGroup[] = [null, null, null, null, null];

  @Output() addPicture = new EventEmitter<any>();
  @Output() addSkillEvent = new EventEmitter<any>();
  @Output() deletion : EventEmitter<number> = new EventEmitter<number>();
  @Output() new : EventEmitter<void> = new EventEmitter<void>();
  @Output() removePicture = new EventEmitter<any>();
  @Output() removeSkillEvent = new EventEmitter<any>();
  @Output() update : EventEmitter<any> = new EventEmitter<any>();

  public constructor(
    private _dialog : MatDialog
  ) {}

  public receiveFormGrp(grp : FormGroup, index : number) : void {
    this.projectsForms[index] = grp;
  }

  public allFormsValid() : boolean {
    let res : boolean;
    let i = 0;
    do {
      res = this.projectsForms[i] === null || this.projectsForms[i].valid;
      i++;
    } while (res && i < this.projectsForms.length);
    return res;
  }

  public onDelete(index : number) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title : 'Validation de suppression',
      message : 'Attention, cette action est irréversible.',
      yes: 'Supprimer le projet',
      no: 'Annuler'
    };
    const dialogRef = this._dialog.open(YesNoDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {if (data) this.deletion.emit(index)});
  }
}
