import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProjectSingleEditComponent } from '../project-single-edit/project-single-edit.component';
import { ProjectService } from 'src/app/_services/project.service';

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
