import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-cust-input',
  templateUrl: './name-cust-input.component.html',
  styleUrls: ['./name-cust-input.component.scss']
})
export class NameCustInputComponent implements OnInit {
  @Input() customer: any;
  @Output() customerChange = new EventEmitter<any>();
  nameCtrl = new FormControl();
  message = "";
  constructor() { }

  ngOnInit(): void {
    this.nameCtrl.setValue(this.customer.name);
  }

  onSubmit(){
    if(this.nameCtrl.value!=null){
      console.log(this.message);
      if(this.check()){
        this.customer.name = this.nameCtrl.value;
        this.customerChange.emit(this.customer);
      }
    }
  }

  check(): boolean{
    const val = this.nameCtrl.value as string;
    if(val == this.customer.name ){
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
