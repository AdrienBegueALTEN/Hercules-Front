import { MissionService } from './../_services/mission.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { FormGroup } from '@angular/forms';
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
  consultantFormGrp : FormGroup;
  customerFormGrp : FormGroup;

  constructor(
    private _consultantService : ConsultantService,
    private _customerService : CustomerService,
    private _missionService : MissionService,
    private _tokenStorageService : TokenStorageService
  ){}

  ngOnInit() {}

  updateConsultant(consultantFormGrp : FormGroup) {
    this.consultantFormGrp = consultantFormGrp;
  }

  updateCustomer(customerFormGrp : FormGroup) {
    this.customerFormGrp = customerFormGrp;
  }

  onNewConsultant() { this.newConsultant = true; }

  onNewCustomer() { this.newCustomer = true; }

  onCreateMission() {
    let consultant  = this.consultantFormGrp.value;
    let customer  = this.customerFormGrp.value;
    let manager = this._tokenStorageService.getUser().id;
    var consultantId : number;
    var customerId : number;
    this._consultantService.addConsultant(consultant.email, consultant.firstname, consultant.lastname, consultant.xp, manager).subscribe(data => { consultantId = data; }, err => {console.log(err)});
    this._customerService.addCustomer(customer.name, customer.activity_sector).subscribe(data => { customerId = data; }, err => {console.log(err)});
    this._missionService.addMission(2, 1).subscribe(() => {}, err => {console.log(err)});
  }
}
