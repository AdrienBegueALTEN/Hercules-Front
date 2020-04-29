import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-array-mission-item',
  templateUrl: './array-mission-item.component.html',
  styleUrls: ['./array-mission-item.component.scss']
})
export class ArrayMissionItemComponent implements OnInit {

  @Input() mission: any;
  @Input() projects: any[];
  isProjectsVisible = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.projects);
  }

  toggleProjects(){
    this.isProjectsVisible = !this.isProjectsVisible;
  }

}
