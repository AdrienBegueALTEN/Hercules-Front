import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
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
import { MatDialogConfig } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MessageDialogComponent } from '../../_dialog/message/message-dialog.component';
import { ConsultantAutocompleteComponent } from '../../_input/autocomplete/consultant/consultant-autocomplete.component';
import { Router } from '@angular/router';

/**
 * Handles the mission creation process
 */
const CONSULTANT_STEP : number = 0;
const CUSTOMER_STEP : number = 1;
const NEW_MISSION_STEP : number = 2;

@Component({
  selector: 'app-new-mission-page',
  templateUrl: './new-mission-page.component.html',
  styleUrls: ['./new-mission-page.component.scss']
})
export class NewMissionPageComponent implements OnInit, AfterContentChecked {
  /**
   * True : the consultant doesn't exist yet
   * False : the consultant exists
   */
  newConsultant : boolean = false;
  /**
   * Form for a consultant
   */
  consultantForm : FormControl | FormGroup;
  /**
   * True : the customer doesn't exist yet
   * False : the customer exists
   */
  newCustomer : boolean = false;
  customerForm : FormControl | FormGroup;
  /**
   * Customers array. Contains all customers
   */
  customers : any[];
  /**
   * Consultants array. Contains all consultants
   */
  consultants : any[];

  @ViewChild('stepper') stepper : MatStepper;
  @ViewChild('consultantAutocomplete') consultantAutocomplete : ConsultantAutocompleteComponent;
  @ViewChild('newConsultant') newConsultantChild : NewUserComponent;

  constructor(
    private _authService : AuthService,
    private _cdr: ChangeDetectorRef,
    private _consultantService : ConsultantService,
    private _customerService : CustomerService,
    private _dialogUtils : DialogUtilsService,
    private _missionService : MissionService,
    private _router : Router
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

  /**
   * Function that creates the mission if the user enters in the third step for a new mission, ie he has given a customer and a consultant
   * @param event details on the selected step
   */
  onStepChange(event : StepperSelectionEvent) : void {
    if (event.selectedIndex === NEW_MISSION_STEP)
      this._createMissionConsultantStep();
  }

  /**
   * Function that sends an http request and creates the consultant in the database if it's a new one and then goes to the customer part
   */
  private _createMissionConsultantStep() : void {
    let consultant = this.consultantForm.value;
    if (this.newConsultant) { //A new consultant need to be created
      let manager = this._authService.getUser().id; //The authenticated user is defined as the manager of the new consultant
      this._consultantService.newConsultant(consultant.email, consultant.firstname, consultant.lastname, manager).subscribe(
        response => { this._handleNewConsultantResponse(response); },
        error => { this._handleNewConsultantError(error); }); //An error occurred during the creation of the new consultant
    } else this._createMissionCustomerStep(consultant.id, false); //The consultant step is OK, passage to the customer step
  }

  /**
   * Function that sends an http request and creates the customer in the database if it's a new one and then goes to the mission part
   * @param consultantId ID of the consultant of the mission
   * @param newConsultant boolean that indicates if the consultant was created in this process
   */
  private _createMissionCustomerStep(consultantId : number, newConsultant : boolean) : void {
    let customer = this.customerForm.value;
    if (this.newCustomer) { //A new customer need to be created
      this._customerService.newCustomer(customer.name, customer.activitySector).subscribe(
        response => { this._handleNewCustomerResponse(consultantId, newConsultant, response); },
        () => { this._handleNewCustomerError(consultantId, newConsultant); }); //An error occurred during the creation of the new customer
    } else this._createMissionFinalStep(consultantId, newConsultant, customer.id, false); //The customer step is OK, passage to the final step
  }

  /**
   * Function that sends an http request and creates the new mission in the database
   * @param consultantId ID of the consultant
   * @param newConsultant boolean that indicates if the consultant was created in this process
   * @param customerId ID of the customer
   * @param newCustomer boolean that indicates if the customer was created in this process
   */
  private _createMissionFinalStep(consultantId : number, newConsultant : boolean, customerId : number, newCustomer : boolean) : void {
    this._missionService.newMission(consultantId, customerId).subscribe(
      missionId => { this._router.navigateByUrl('missions/' + missionId); }, //The mission has been successfully created
      () => { this._handleNewMissionError(consultantId, newConsultant, customerId, newCustomer); }); //An error occurred during the creation of the new mission
  }

  /**
   * Function that displays a window if the response has the already used email status
   * @param response Response from the request for adding a consultant
   */
  private _handleNewConsultantResponse(response : Response) : void {
    switch(response.status) {
      case HttpStatus.ACCEPTED : //The email is already used by a consultant
        const email = this.consultantForm.value.email;
        this._dialogUtils.showYesNoDialog(
          'Consultant existant',
          'Un consultant est déjà lié à l\'adresse email "' + email + '". Que souhaitez vous faire ?',
          'Poursuivre l\'opération avec le consultant existant',
          'Modifier l\'email'
        ).afterClosed().subscribe(
          yes => {
            if (yes) {
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
  /**
   * Function that displays an error message for a response for adding a new consultant
   * @param error Response from the request for adding a consultant
   */
  private _handleNewConsultantError(error : Response) : void {
    const dialogConfig = new MatDialogConfig();
    switch(error.status) {
      case HttpStatus.CONFLICT :
        this._dialogUtils.showMsgDialog('L\'adresse email renseignée pour le consultant n\'est pas disponible. Merci de bien vouloir en choisir une autre.').afterClosed().subscribe(
          () => this.stepper.selectedIndex = CONSULTANT_STEP);  
        break;
      default :
        this._dialogUtils.showMsgDialog('Le consultant n\'a pas pu être créé.')
    }
  }
  /**
   * Function that displays a window if the response has the already existing customer status
   * @param response Response from the request for adding a customer
   */
  private _handleNewCustomerResponse(consultantId : number, newConsultant : boolean, response : Response) : void {
    switch(response.status) {
      case HttpStatus.ACCEPTED : //The customer already exists
        const customer = this.customerForm.value.name;
        this._dialogUtils.showYesNoDialog(
          'Client existant',
          'Le client "' + customer + '" existe déjà. Que souhaitez vous faire ?',
          'Continuer avec le client existant',
          'Modifier le client'
        ).afterClosed().subscribe(
          yes => {
            if (yes) {
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

  /**
   * Function that displays an error message for a response for adding a new customer
   * @param error Response from the request for adding a customer
   */
  private _handleNewCustomerError(consultantId : number, newConsultant : boolean) : void {
    if (newConsultant)
      this._consultantService.deleteConsultant(consultantId).subscribe();

    this._dialogUtils.showMsgDialog('Le client n\'a pas pu être créé.');
  }

  /**
   * Function that displays an error message for a response for adding a new mission and deletes the added elements
   * @param consultantId ID of the consultant
   * @param newConsultant boolean that indicates if the consultant was created in this process
   * @param customerId ID of the customer
   * @param newCustomer boolean that indicates if the customer was created in this process
   */
  private _handleNewMissionError(consultantId : number, newConsultant : boolean, customerId : number, newCustomer : boolean) : void {
    if (newConsultant)
      this._consultantService.deleteConsultant(consultantId).subscribe();
    if (newCustomer)
      this._customerService.deleteCustomer(customerId).subscribe();
    this._dialogUtils.showMsgDialog('La mission n\'a pas pu être créée.').afterClosed().subscribe(
      () => { this._router.navigateByUrl('') });
  }
}