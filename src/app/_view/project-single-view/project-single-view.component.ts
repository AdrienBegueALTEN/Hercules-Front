import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-single-view',
  templateUrl: './project-single-view.component.html',
  styleUrls: ['./project-single-view.component.scss']
})
export class ProjectSingleViewComponent implements OnInit {
  @Input() project;
  constructor() { }

  ngOnInit(): void {
  }

}
