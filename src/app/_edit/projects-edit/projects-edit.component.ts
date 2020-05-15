import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProjectSingleEditComponent } from '../project-single-edit/project-single-edit.component';
import { ProjectService } from 'src/app/_services/project.service';
import { MissionService } from 'src/app/_services/mission.service';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit {
  @ViewChild(ProjectSingleEditComponent, { static: false }) private projectSingleEdit: ProjectSingleEditComponent;
  @Input() projects;
  @Input() mission;
  @Output() reload = new EventEmitter<any>();

  constructor(private _projectService: ProjectService) { 
  }

  ngOnInit(): void {
  }

  getIndex(index:number){
    this.projectSingleEdit.setProject(this.projects[index]);
  }

  onCreate(){
    this._projectService.newProject(this.mission.id).subscribe(
      (proj) => {
        this.reload.emit();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  sendReload(){
    //this.reload.emit();
  }
}
