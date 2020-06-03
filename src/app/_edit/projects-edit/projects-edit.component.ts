import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html'
})
export class ProjectsEditComponent {
  @Input() externalVersion : boolean = false;
  @Input() projects : any [];

  @Output() new : EventEmitter<void> = new EventEmitter<void>();
  @Output() update : EventEmitter<any> = new EventEmitter<any>();
  @Output() deletion : EventEmitter<number> = new EventEmitter<number>();
  @Output() addSkillEvent = new EventEmitter<any>();
  @Output() removeSkillEvent = new EventEmitter<any>()

  @ViewChild('tabGrp') tabGrp : MatTabGroup;
  @Output() image : EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteImage : EventEmitter<any> = new EventEmitter<any>();

}
