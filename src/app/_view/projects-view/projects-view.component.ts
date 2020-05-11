import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss']
})
export class ProjectsViewComponent implements OnInit {
  @Input() projects;
  constructor() { }

  ngOnInit(): void {
    console.log(this.projects);
  }

}
