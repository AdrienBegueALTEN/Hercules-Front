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
  currentIndex: number;

  constructor() { 
  }

  ngOnInit(): void {
    this.currentIndex = 0; 
  }

  getIndex(index:number){
    this.currentIndex = index;
    if(index>=0)
      this.projectSingleEdit.setProject(this.projects[this.currentIndex]);
    else
      alert("Ajout d'un projet vide à cette version");
  }

  createProject(){
    this.currentIndex = -1;
  }

}
