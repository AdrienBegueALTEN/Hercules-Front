import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  @Input() customer : any;
  
  constructor() { }

  ngOnInit() {
  }

}
