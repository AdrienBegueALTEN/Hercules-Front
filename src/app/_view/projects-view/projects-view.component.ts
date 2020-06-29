import { Component, OnInit, Input } from '@angular/core';

/**
 * Gets informations about the clicked on by the user
 */
@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html'
})
export class ProjectsViewComponent implements OnInit {
  /**
   * Contains all projects
   */
  @Input() projects;

  /**
   * Project index number
   */
  currentIndex: number;
  constructor() { }

  ngOnInit(): void {
    this.currentIndex = 0; 
  }

  /**
   * Get project index
   * @param index Project index
   */
  getIndex(index:number){
    this.currentIndex = index;
  }

}
