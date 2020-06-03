import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html'
})
export class ProjectsEditComponent {
  @Input() externalVersion : boolean = false;
  @Input() projects : any [];

  public projectsForms : FormGroup[] = [null, null, null, null, null];

  @Output() new : EventEmitter<void> = new EventEmitter<void>();
  @Output() update : EventEmitter<any> = new EventEmitter<any>();
  @Output() deletion : EventEmitter<number> = new EventEmitter<number>();
  @Output() addSkillEvent = new EventEmitter<any>();
  @Output() removeSkillEvent = new EventEmitter<any>()

  @Output() image : EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteImage : EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('tabGrp') tabGrp : MatTabGroup;

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
}
