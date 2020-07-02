import { MatTabGroup } from '@angular/material/tabs';
import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * This component provides the function and events needed for editing projects
 */
@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsEditComponent  {
  /**
   * Boolean that indicates if the projects are updated by the consultant with an external link
   */
  @Input() externalVersion : boolean = false;
  /**
   * List of objects that contains the details of the projects
   */
  @Input() projects : any [];

  /**
   * List of the forms of the projects
   */
  public projectsForms : FormGroup[] = [null, null, null, null, null];

  /**
   * Emits an event when a picture is added
   */
  @Output() addPicture = new EventEmitter<any>();
  /**
   * Emits an event when a skill is added
   */
  @Output() addSkillEvent = new EventEmitter<any>();
  /**
   * Emits an event when a deletion occurs
   */
  @Output() deletion : EventEmitter<number> = new EventEmitter<number>();
  /**
   * Emits an event when a new element is sent by the user
   */
  @Output() new : EventEmitter<void> = new EventEmitter<void>();
  /**
   * Emits an event when a picture is removed
   */
  @Output() removePicture = new EventEmitter<any>();
  /**
   * Emits an event when a skill is removed
   */
  @Output() removeSkillEvent = new EventEmitter<any>();
  /**
   * Emits an event when any field is updated
   */
  @Output() update : EventEmitter<any> = new EventEmitter<any>();

  /**
   * Angular mat for the table of projects
   */
  @ViewChild('tabGrp') tabGrp : MatTabGroup;

  public constructor(
    private _dialogUtils : DialogUtilsService
  ) {}
  
  /**
   * Function that adds a form to the list of forms
   * @param grp form to add
   * @param index index in the list where to add the given form
   */
  public receiveFormGrp(grp : FormGroup, index : number) : void {
    this.projectsForms[index] = grp;
  }

  /**
   * Function that indicates if the forms are all valid
   * @returns Boolean that indicates if all the forms are valid
   */
  public allFormsValid() : boolean {
    let res : boolean;
    let i = 0;
    do {
      res = this.projectsForms[i] === null || this.projectsForms[i].valid;
      i++;
    } while (res && i < this.projectsForms.length);
    return res;
  }

  /**
   * Function that displays a window for the deletion of a project
   * @param index index of the deleted project
   */
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
