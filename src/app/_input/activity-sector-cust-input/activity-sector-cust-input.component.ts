import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-activity-sector-cust-input',
  templateUrl: './activity-sector-cust-input.component.html',
  styleUrls: ['./activity-sector-cust-input.component.scss']
})
export class ActivitySectorCustInputComponent implements OnInit {
  @Input() customer: any;
  @Output() customerChange = new EventEmitter<any>();
  activitySectorCtrl = new FormControl();
  message = "";
  constructor() { }

  ngOnInit(): void {
    this.activitySectorCtrl.setValue(this.customer.activitySector);
  }

  onSubmit(){
    if(this.activitySectorCtrl.value!=null){
      console.log(this.message);
      if(this.check()){
        this.customer.activitySector = this.activitySectorCtrl.value;
        this.customerChange.emit(this.customer);
      }
    }
  }

  check(): boolean{
    const val = this.activitySectorCtrl.value as string;
    if(val == this.customer.activitySector ){
      this.message = "Le secteur d'activité est le même."
      return false;
    }
    if(val.length<=0){
      this.message = "Le secteur d'activité doit être rempli."
      return false;
    }
    this.message = ""
    return true;
  }
}
