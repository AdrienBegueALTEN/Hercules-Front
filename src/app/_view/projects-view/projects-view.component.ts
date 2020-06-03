import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html'
})
export class ProjectsViewComponent implements OnInit {
  @Input() projects;
  currentIndex: number;
  constructor() { }

  ngOnInit(): void {
    this.currentIndex = 0; 
  }

  getIndex(index:number){
    this.currentIndex = index;
  }

}
