import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-project-single-view',
  templateUrl: './project-single-view.component.html'
})
export class ProjectSingleViewComponent implements OnInit {
  @Input() project;

  public pictureSrc : string;

  ngOnInit(): void {
    this.pictureSrc = AppSettings.PROJECT_PICTURE_PATH + this.project.picture;
  }

}
