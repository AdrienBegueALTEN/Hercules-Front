import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mission-view-customer',
  templateUrl: './mission-view-customer.component.html',
  styleUrls: ['./../mission-view.component.scss']
})
export class MissionViewCustomerComponent implements OnInit {

  @Input() customer : any;

  constructor() { }

  ngOnInit() {
  }

}
