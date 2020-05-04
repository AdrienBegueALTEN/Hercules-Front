import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.scss']
})
export class MissionEditComponent implements OnInit {
  @Input() mission : any;

  constructor() { }

  ngOnInit() {
  }

}
