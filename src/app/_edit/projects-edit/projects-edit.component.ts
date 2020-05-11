import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit {

  @Input() projects;
  currentIndex: number;

  constructor() { 
    this.currentIndex = 0; 
  }

  ngOnInit(): void {
  }

  changeProject(index:number){
    this.currentIndex = index;
  }

  createProject(){
    this.currentIndex = -1;
  }

}
