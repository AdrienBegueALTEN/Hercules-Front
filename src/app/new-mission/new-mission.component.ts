import { AppSettings } from './../app-settings';
import { MissionService } from './../_services/mission.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatus } from 'src/http-status';
import { Router } from '@angular/router';
import { BasicCustomer } from '../_interface/basic-customer';

@Component({
  selector: 'app-new-mission',
  templateUrl: './new-mission.component.html',
  styleUrls: ['./new-mission.component.scss']
})
export class NewMissionComponent implements OnInit, AfterContentChecked {
  newConsultant : boolean = false;
  newCustomer : boolean = false;
  customers : BasicCustomer[];
  consultantForm : FormControl | FormGroup;
  customerForm : FormControl | FormGroup;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _consultantService : ConsultantService,
    private _customerService : CustomerService,
    private _missionService : MissionService,
    private _snackBar: MatSnackBar,
    private _tokenStorageService : TokenStorageService
  ){}

  ngOnInit() {
    this._customerService.getBasicCustomers().subscribe(
      customers => { this.customers = customers; },
      err => { console.log(err); }
    );
  }

  ngAfterContentChecked(): void {
    this._cdr.detectChanges();
  }

  getConsultantForm(consultant : FormControl | FormGroup) {
    this.consultantForm = consultant;
  }

  getCustomerForm(customer : FormControl | FormGroup) {
    this.customerForm = customer;
  }

  selectionChange(event : StepperSelectionEvent) : void {
    if (event.selectedIndex === 2) this._createMission();
  }

  private _createMission() {
    let consultant = this.consultantForm.value;
   
    if (this.newConsultant) {
      let manager = this._tokenStorageService.getUser().id;
      let email = consultant.email.concat('@alten.com');
      this._consultantService.newConsultant(email, consultant.firstname, consultant.lastname, consultant.xp, manager).subscribe(
        consultantId => { this._subCreateMission(consultantId); },
        err => { 
          this._handleNewConsultantError(err);
          return;
        });
    } else this._subCreateMission(consultant.id);
  }

  private _subCreateMission(consultantId : number) : void {
    let customer = this.customerForm.value;

    if (this.newCustomer) {
      this._customerService.newCustomer(customer.name, customer.activitySector, customer.description).subscribe(
        customerId => {
          this._missionService.newMission(consultantId, customerId).subscribe(
            idMission => { window.location.replace('missions/' + idMission); },
            err => { console.log(err) });
        },
        err => { this._handleNewCustomerError(); return; });
    } else this._missionService.newMission(consultantId, customer.id).subscribe(
      idMission => { window.location.replace('missions/' + idMission); },
      err => { this._handleNewMissionError(); return; });
  }

  private _handleNewConsultantError(error : Response) : void {
    if (error.status === HttpStatus.CONFLICT)
      this._snackBar.open('L\'email renseigné pour le consultant est déjà utilisé. Merci d\'en choisir un autre', 'X');
    else
      this._snackBar.open('Echec de création du nouveau consultant...', 'X');
  }

  private _handleNewCustomerError() : void {
    this._snackBar.open('Echec de création du nouveau client...', 'X');
  }

  private _handleNewMissionError() : void {
    this._snackBar.open('Echec de création de la nouvelle mission...', 'X');
  }
}
