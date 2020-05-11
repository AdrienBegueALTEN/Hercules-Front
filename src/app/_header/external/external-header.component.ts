import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-external-header',
  templateUrl: './external-header.component.html',
  styleUrls: ['../header.scss']
})
export class ExternalHeaderComponent implements OnInit {
  @Input() mission : any;

  constructor() { }

  ngOnInit() {
  }

}
