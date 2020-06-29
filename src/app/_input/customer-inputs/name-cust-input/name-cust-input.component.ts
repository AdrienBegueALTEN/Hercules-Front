import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-cust-input',
  templateUrl: './name-cust-input.component.html',
  styleUrls: ['./name-cust-input.component.scss']
})
export class NameCustInputComponent implements OnInit {
  /**
   * Customer to modify
   */
  @Input() customer: any;
  /**
   * Event with modified customer
   */
  @Output() customerChange = new EventEmitter<any>();
  /**
   * Input control for the customer name
   */
  nameCtrl = new FormControl();
  /**
   * Error message
   */
  message = "";

  constructor() { }

  ngOnInit(): void {
    this.nameCtrl.setValue(this.customer.name);
  }

  /**
   * Emit an event with the modified customer if the check function pass.
   */
  onSubmit(){
    if(this.nameCtrl.value!=null){
      console.log(this.message);
      if(this.check()){
        this.customer.name = this.nameCtrl.value;
        this.customerChange.emit(this.customer);
      }
    }
  }

  /**
   * Check if the control value is different from the current name or is not empty, else create an error message.
   */
  check(): boolean{
    const val = this.nameCtrl.value as string;
    if(val == this.customer.name ){
      this.message = ""
      return false;
    }
    if(val.length<=0){
      this.message = "Le nom doit être rempli.";
      return false;
    }
    this.message = ""
    return true;
  }

}
