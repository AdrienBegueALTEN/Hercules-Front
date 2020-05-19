import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html'
})
export class ProjectsEditComponent {
  @Input() projects;

  @Output() new : EventEmitter<void> = new EventEmitter<void>();
  @Output() update : EventEmitter<any> = new EventEmitter<any>();
  @Output() deletion : EventEmitter<number> = new EventEmitter<number>();
}
