import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {
  @Input() customer : any;

  constructor() { }

  ngOnInit() {
  }

}
