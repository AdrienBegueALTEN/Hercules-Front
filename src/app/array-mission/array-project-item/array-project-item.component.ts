import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-array-project-item',
  templateUrl: './array-project-item.component.html',
  styleUrls: ['./array-project-item.component.scss']
})
export class ArrayProjectItemComponent implements OnInit {

  @Input() project;
  constructor() { }

  ngOnInit(): void {
    console.log(this.project);
  }

}
