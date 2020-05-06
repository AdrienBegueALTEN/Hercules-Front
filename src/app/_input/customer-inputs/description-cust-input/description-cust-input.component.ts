import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-description-cust-input',
  templateUrl: './description-cust-input.component.html',
  styleUrls: ['./description-cust-input.component.scss']
})
export class DescriptionCustInputComponent implements OnInit {

  @Input() customer: any;
  @Output() customerChange = new EventEmitter<any>();
  descriptionCtrl = new FormControl();
  constructor() { }

  ngOnInit(): void {
    this.descriptionCtrl.setValue(this.customer.description);
  }

  onSubmit(){
    if(this.descriptionCtrl.value!=null){
      if(this.check()){
        this.customer.description = this.descriptionCtrl.value;
        this.customerChange.emit(this.customer);
      }
    }
  }

  check(): boolean{
    const val = this.descriptionCtrl.value as string;
    if(val == this.customer.description ){
      return false;
    }
    return true;
  }
}
