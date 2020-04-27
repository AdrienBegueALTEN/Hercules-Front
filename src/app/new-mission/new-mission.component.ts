import { YesNoDialogComponent } from '../dialog/yes-no/yes-no-dialog.component';
import { MissionService } from './../_services/mission.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, AfterContentChecked, ViewChild } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { BasicCustomer } from '../_interface/basic-customer';
import { HttpStatus } from '../http-status.enum';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { OkDialogComponent } from '../dialog/ok/ok-dialog.component';
import { ConsultantAutocompleteComponent } from './consultant-autocomplete/consultant-autocomplete.component';

@Component({
  selector: 'app-new-mission',
  templateUrl: './new-mission.component.html',
  styleUrls: ['./new-mission.component.scss']
})
export class NewMissionComponent implements OnInit, AfterContentChecked {
  private static CONSULTANT_STEP = 0;
  private static CUSTOMER_STEP = 1;
  private static NEW_MISSION_STEP = 2;

  newConsultant : boolean = false;
  consultantForm : FormControl | FormGroup;
  newCustomer : boolean = false;
  customerForm : FormControl | FormGroup;
  customers : BasicCustomer[];

  @ViewChild('stepper') stepper : MatStepper;
  @ViewChild('consultantAutocomplete') consultantAutocomplete : ConsultantAutocompleteComponent;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _consultantService : ConsultantService,
    private _customerService : CustomerService,
    private _dialog : MatDialog,
    private _missionService : MissionService,
    private _tokenStorageService : TokenStorageService
  ){}

  ngOnInit() : void {
    this._customerService.getBasicCustomers().subscribe(
      customers => { this.customers = customers; },
      err => { console.log(err); }
    );
  }

  ngAfterContentChecked() : void {
    this._cdr.detectChanges();
  }

  getConsultantForm(consultant : FormControl | FormGroup) : void {
    this.consultantForm = consultant;
  }

  getCustomerForm(customer : FormControl | FormGroup) : void {
    this.customerForm = customer;
  }

  onStepChange(event : StepperSelectionEvent) : void {
    if (event.selectedIndex === NewMissionComponent.NEW_MISSION_STEP)
      this._createMissionConsultantStep();
  }

  private _createMissionConsultantStep() : void {
    let consultant = this.consultantForm.value;
    if (this.newConsultant) { //A new consultant need to be created
      let manager = this._tokenStorageService.getUser().id; //The authenticated user is defined as the manager of the new consultant
      this._consultantService.newConsultant(consultant.email, consultant.firstname, consultant.lastname, consultant.xp, manager).subscribe(
        response => { this._handleNewConsultantResponse(response); },
        error => { this._handleNewConsultantError(error); }); //An error occurred during the creation of the new consultant
    } else this._createMissionCustomerStep(consultant.id); //The consultant step is OK, passage to the customer step
  }

  private _createMissionCustomerStep(consultantId : number) : void {
    let customer = this.customerForm.value;
    if (this.newCustomer) { //A new customer need to be created
      this._customerService.newCustomer(customer.name, customer.activitySector, customer.description).subscribe(
        response => { this._handleNewCustomerResponse(consultantId, response); },
        () => { this._handleNewCustomerError(consultantId); }); //An error occurred during the creation of the new customer
    } else this._createMissionFinalStep(consultantId, customer.id); //The customer step is OK, passage to the final step
  }

  private _createMissionFinalStep(consultantId : number, customerId : number) : void {
    this._missionService.newMission(consultantId, customerId).subscribe(
      idMission => { window.location.replace('missions/' + idMission); }, //The mission has been successfully created
      () => { this._handleNewMissionError(consultantId, customerId); }); //An error occurred during the creation of the new mission
  }

  private _handleNewConsultantResponse(response : Response) : void {
    switch(response.status) {
      case HttpStatus.ACCEPTED : //The email is already used by a consultant
        const email = this.consultantForm.value.email;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          title : 'Consultant existant',
          message : 'Un consultant est déjà lié à l\'adresse email "' + email + '". Que souhaitez vous faire ?',
          yes: 'Poursuivre l\'opération avec le consultant existant',
          no: 'Modifier l\'email'
        };
        const dialogRef = this._dialog.open(YesNoDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
          data => {
            if (data) {
              this.newConsultant = false;
              const id : number = parseInt(String(response.body));
              this.consultantAutocomplete.selectConsultant(id);
              this._createMissionCustomerStep(id);
            } else this.stepper.selectedIndex = NewMissionComponent.CONSULTANT_STEP;
          });  
        break;
      case HttpStatus.CREATED : //The consultant step is OK, passage to the customer step
        const id : number = parseInt(String(response.body));
        this._createMissionCustomerStep(id);
        break;
    }
  }

  private _handleNewConsultantError(error : Response) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    switch(error.status) {
      case HttpStatus.CONFLICT :
        const email = this.consultantForm.value.email;
        dialogConfig.data = {
          title : 'Email indisponible',
          message : 'L\'adresse email "' + email + '" est déjà utilisée.',
          ok: 'Modifier l\'email'
        };
        const dialogRef = this._dialog.open(OkDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => { this.stepper.selectedIndex = NewMissionComponent.CONSULTANT_STEP; });  
        break;
      default :
        dialogConfig.data = {
          title : 'Echec de la création du consultant',
          message : 'Le consultant n\'a pas pu être créé.',
          ok: 'OK'
        };
        this._dialog.open(OkDialogComponent, dialogConfig);
    }
  }

  private _handleNewCustomerResponse(consultantId : number, response : Response) : void {
    switch(response.status) {
      case HttpStatus.ACCEPTED : //The customer already exists
        const customer = this.customerForm.value.name;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          title : 'Client existant',
          message : 'Le client "' + customer + '" existe déjà. Que souhaitez vous faire ?',
          yes: 'Continuer avec le client existant',
          no: 'Modifier le client'
        };
        const dialogRef = this._dialog.open(YesNoDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
          data => {
            if (data) {
              this.newCustomer = false;
              const customerId : number = parseInt(String(response.body));
              this._createMissionFinalStep(consultantId, customerId)
            } else {
              if (this.newConsultant)
                this._consultantService.deleteConsultant(consultantId).subscribe();
              this.stepper.selectedIndex = NewMissionComponent.CUSTOMER_STEP;
            }
          });
        break;
      case HttpStatus.CREATED : //The customer step is OK, passage to the final step
        const customerId : number = parseInt(String(response.body));
        this._createMissionFinalStep(consultantId, customerId)
        break;
    }
  }

  private _handleNewCustomerError(consultantId : number) : void {
    if (this.newConsultant)
      this._consultantService.deleteConsultant(consultantId).subscribe();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Echec de la création du client',
      message : 'Le client n\'a pas pu être créé.',
      ok: 'OK'
    };
    this._dialog.open(OkDialogComponent, dialogConfig);
  }

  private _handleNewMissionError(consultantId : number, customerId : number) : void {
    if (this.newConsultant)
      this._consultantService.deleteConsultant(consultantId).subscribe();

    if (this.newCustomer)
      this._customerService.deleteCustomer(customerId).subscribe();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Echec de la création de la mission',
      message : 'La mission n\'a pas pu être créée.',
      ok: 'OK'
    };
    const dialogRef = this._dialog.open(OkDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      () => {window.location.replace('home/')});
  }
}