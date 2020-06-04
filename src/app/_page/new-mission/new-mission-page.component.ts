import { NewUserComponent } from './../../_input/new-user/new-user.component';
import { AuthService } from 'src/app/_services/auth.service';
import { YesNoDialogComponent } from '../../_dialog/yes-no/yes-no-dialog.component';
import { MissionService } from '../../_services/mission.service';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, AfterContentChecked, ViewChild } from '@angular/core';
import { CustomerService } from '../../_services/customer.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { HttpStatus } from '../../_enums/http-status.enum';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MessageDialogComponent } from '../../_dialog/message/message-dialog.component';
import { ConsultantAutocompleteComponent } from '../../_input/autocomplete/consultant/consultant-autocomplete.component';

const CONSULTANT_STEP : number = 0;
const CUSTOMER_STEP : number = 1;
const NEW_MISSION_STEP : number = 2;

@Component({
  selector: 'app-new-mission-page',
  templateUrl: './new-mission-page.component.html',
  styleUrls: ['./new-mission-page.component.scss']
})
export class NewMissionPageComponent implements OnInit, AfterContentChecked {
  newConsultant : boolean = false;
  consultantForm : FormControl | FormGroup;
  newCustomer : boolean = false;
  customerForm : FormControl | FormGroup;
  customers : any[];
  consultants : any[];

  @ViewChild('stepper') stepper : MatStepper;
  @ViewChild('consultantAutocomplete') consultantAutocomplete : ConsultantAutocompleteComponent;
  @ViewChild('newConsultant') newConsultantChild : NewUserComponent;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _consultantService : ConsultantService,
    private _customerService : CustomerService,
    private _dialog : MatDialog,
    private _missionService : MissionService,
    private _authService : AuthService
  ){}

  public ngOnInit() : void {
    this._customerService.getAll().subscribe(
      customers => this.customers = customers,
      error => console.log(error) 
    );
    this._consultantService.getConsultants(true).subscribe(
      consultants => this.consultants = consultants,
      error => console.log(error)
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
    if (event.selectedIndex === NEW_MISSION_STEP)
      this._createMissionConsultantStep();
  }

  private _createMissionConsultantStep() : void {
    let consultant = this.consultantForm.value;
    if (this.newConsultant) { //A new consultant need to be created
      let manager = this._authService.getUser().id; //The authenticated user is defined as the manager of the new consultant
      this._consultantService.newConsultant(consultant.email, consultant.firstname, consultant.lastname, manager).subscribe(
        response => { this._handleNewConsultantResponse(response); },
        error => { this._handleNewConsultantError(error); }); //An error occurred during the creation of the new consultant
    } else this._createMissionCustomerStep(consultant.id, false); //The consultant step is OK, passage to the customer step
  }

  private _createMissionCustomerStep(consultantId : number, newConsultant : boolean) : void {
    let customer = this.customerForm.value;
    if (this.newCustomer) { //A new customer need to be created
      this._customerService.newCustomer(customer.name, customer.activitySector).subscribe(
        response => { this._handleNewCustomerResponse(consultantId, newConsultant, response); },
        () => { this._handleNewCustomerError(consultantId, newConsultant); }); //An error occurred during the creation of the new customer
    } else this._createMissionFinalStep(consultantId, newConsultant, customer.id, false); //The customer step is OK, passage to the final step
  }

  private _createMissionFinalStep(consultantId : number, newConsultant : boolean, customerId : number, newCustomer : boolean) : void {
    this._missionService.newMission(consultantId, customerId).subscribe(
      missionId => { window.location.replace('missions/' + missionId); }, //The mission has been successfully created
      () => { this._handleNewMissionError(consultantId, newConsultant, customerId, newCustomer); }); //An error occurred during the creation of the new mission
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
              const id : number = parseInt(String(response.body));
              this._createMissionCustomerStep(id, false);
            } else this.stepper.selectedIndex = CONSULTANT_STEP;
          });  
        break;
      case HttpStatus.CREATED : //The consultant step is OK, passage to the customer step
        const id : number = parseInt(String(response.body));
        this._createMissionCustomerStep(id, true);
        break;
    }
  }

  private _handleNewConsultantError(error : Response) : void {
    const dialogConfig = new MatDialogConfig();
    switch(error.status) {
      case HttpStatus.CONFLICT :
        dialogConfig.data = 'L\'adresse email renseignée pour le consultant n\'est pas disponible. Merci de bien vouloir en choisir une autre.';
        const dialogRef = this._dialog.open(MessageDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => this.stepper.selectedIndex = CONSULTANT_STEP);  
        break;
      default :
        dialogConfig.data = 'Le consultant n\'a pas pu être créé.';
        this._dialog.open(MessageDialogComponent, dialogConfig);
    }
  }

  private _handleNewCustomerResponse(consultantId : number, newConsultant : boolean, response : Response) : void {
    switch(response.status) {
      case HttpStatus.ACCEPTED : //The customer already exists
        const customer = this.customerForm.value.name;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
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
              this._createMissionFinalStep(consultantId, newConsultant, customerId, false);
            } else {
              if (newConsultant)
                this._consultantService.deleteConsultant(consultantId).subscribe();
              this.stepper.selectedIndex = CUSTOMER_STEP;
            }
          });
        break;
      case HttpStatus.CREATED : //The customer step is OK, passage to the final step
        const customerId : number = parseInt(String(response.body));
        this._createMissionFinalStep(consultantId, newConsultant, customerId, true);
        break;
    }
  }

  private _handleNewCustomerError(consultantId : number, newConsultant : boolean) : void {
    if (newConsultant)
      this._consultantService.deleteConsultant(consultantId).subscribe();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = 'Le client n\'a pas pu être créé.';
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

  private _handleNewMissionError(consultantId : number, newConsultant : boolean, customerId : number, newCustomer : boolean) : void {
    if (newConsultant)
      this._consultantService.deleteConsultant(consultantId).subscribe();
    if (newCustomer)
      this._customerService.deleteCustomer(customerId).subscribe();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = 'La mission n\'a pas pu être créée.';
    const dialogRef = this._dialog.open(MessageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      () => { window.location.replace('') });
  }
}