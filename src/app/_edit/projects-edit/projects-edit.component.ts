import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProjectSingleEditComponent } from '../project-single-edit/project-single-edit.component';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit {
  @ViewChild(ProjectSingleEditComponent, { static: false }) private projectSingleEdit: ProjectSingleEditComponent;
  @Input() projects;

  constructor() { 
  }

  ngOnInit(): void {
  }

  getIndex(index:number){
    this.projectSingleEdit.setProject(this.projects[index]);
  }

  createProject(){
    alert("nv proj")
  }

}
