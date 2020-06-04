import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-single-view',
  templateUrl: './project-single-view.component.html'
})
export class ProjectSingleViewComponent implements OnInit {
  @Input() project;
  src;
  constructor() { }

  ngOnInit(): void {
    this.src = 'http://localhost:8080/hercules/missions/projects/picture/'+this.project.picture;
  }

}
