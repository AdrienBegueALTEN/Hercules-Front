import { MatTabGroup } from '@angular/material/tabs';
import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  @ViewChild('tabGrp') tabGrp : MatTabGroup;

  public constructor(
    private _dialogUtils : DialogUtilsService
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
    this._dialogUtils.showYesNoDialog(
      'Validation de suppression',
      'Attention, cette action est irréversible.',
      'Supprimer le projet',
      'Annuler').afterClosed().subscribe(yes => {
        if (yes) {
          this.deletion.emit(index)
          this.tabGrp.selectedIndex = 0;
        }
      }
    );
  }
}
