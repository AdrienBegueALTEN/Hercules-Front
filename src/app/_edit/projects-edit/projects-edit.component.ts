import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProjectSingleEditComponent } from '../project-single-edit/project-single-edit.component';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit {
  @ViewChild(ProjectSingleEditComponent, { static: false }) private projectSingleEdit: ProjectSingleEditComponent;
  @Input() projects;

  constructor(private _projectService: ProjectService) { 
  }

  ngOnInit(): void {
  }

  getIndex(index:number){
    this.projectSingleEdit.setProject(this.projects[index]);
  }

  createProject(){
    this._projectService.newProject().subscribe(
      (proj) => {
        
        this.projects.push(proj);
        console.log(this.projects);
        this.ngOnInit();
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
