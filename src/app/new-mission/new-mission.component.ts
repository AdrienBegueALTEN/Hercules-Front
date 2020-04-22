import { MissionService } from './../_services/mission.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';

export const _filter = (opt : string[], value : string) : string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-new-mission',
  templateUrl: './new-mission.component.html',
  styleUrls: ['./new-mission.component.scss']
})
export class NewMissionComponent implements OnInit {
  newConsultant : boolean = false;
  newCustomer : boolean = false;
  disabled : boolean = true;
  consultant : FormControl | FormGroup;
  customer : FormControl | FormGroup;

  constructor(
    private _consultantService : ConsultantService,
    private _customerService : CustomerService,
    private _missionService : MissionService,
    private _tokenStorageService : TokenStorageService
  ){}

  ngOnInit() {}

  updateConsultant(consultant : FormControl | FormGroup) {
    this.consultant = consultant; console.log(consultant);
  }

  updateCustomer(customer : FormControl | FormGroup) {
    this.customer = customer;
  }

  onNewConsultant() { this.newConsultant = true; }

  onNewCustomer() { this.newCustomer = true; }

  onCreateMission() {
    let consultant  = this.consultant.value;
    let customer  = this.customer.value;
    var consultantId : number;
    var customerId : number;

    if (this.newConsultant) {
      let manager = this._tokenStorageService.getUser().id;
      this._consultantService.addConsultant(consultant.email, consultant.firstname, consultant.lastname, consultant.xp, manager).subscribe(data => { consultantId = data; }, err => {console.log(err)});
    } else consultantId = consultant.id;

    if (this.newCustomer)
      this._customerService.addCustomer(customer.name, customer.activity_sector).subscribe(data => { customerId = data; }, err => {console.log(err)});
      else customerId = customer.id;

    this._missionService.addMission(consultantId, customerId).subscribe(() => {}, err => {console.log(err)});
  }
}
