import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consultant-diploma',
  templateUrl: './consultant-diploma.component.html',
  styleUrls: ['./consultant-diploma.component.scss']
})
export class ConsultantDiplomaComponent implements OnInit {

  @Input() diploma:any
  constructor() { }

  ngOnInit(): void {
  }

}
