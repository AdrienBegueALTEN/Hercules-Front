import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Handles data when editing customer description
 */
@Component({
  selector: 'app-description-cust-input',
  templateUrl: './description-cust-input.component.html',
  styleUrls: ['./description-cust-input.component.scss']
})
export class DescriptionCustInputComponent implements OnInit {

  /**
   * Customer to edit
   */
  @Input() customer: any;
  /**
   * Event is emitted when the customer is edited
   */
  @Output() customerChange = new EventEmitter<any>();
  /**
   * Input control of the description
   */
  descriptionCtrl = new FormControl();
  
  constructor() { }

  ngOnInit(): void {
    this.descriptionCtrl.setValue(this.customer.description);
  }

  /**
   * If the value is different from the current description, an event is emmitted with the updated customer.
   */
  onSubmit(){
    if(this.descriptionCtrl.value!=null){
      if(this.check()){
        this.customer.description = this.descriptionCtrl.value;
        this.customerChange.emit(this.customer);
      }
    }
  }

  /**
   * Check if value is different from the current description.
   * @returns True if the new description is different
   */
  check(): boolean{
    const val = this.descriptionCtrl.value as string;
    if(val == this.customer.description ){
      return false;
    }
    return true;
  }
}
