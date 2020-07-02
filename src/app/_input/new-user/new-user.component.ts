import { EmailInputComponent } from './../email-input/email-input.component';
import { LastnameInputComponent } from './../lastname-input/lastname-input.component';
import { FirstnameInputComponent } from './../firstname-input/firstname-input.component';
import { StrUtilsService } from '../../_services/utils/str-utils.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

const FIRSTNAME_KEY = 'firstname';
const LASTNAME_KEY = 'lastname';
const EMAIL_KEY = 'email';

/**
 * Handles new user data
 */
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html'
})
export class NewUserComponent implements OnInit, AfterContentInit  {
  /** Form group for creation of a user */
  public grp : FormGroup;
  /** Event containing the form group */
  @Output() sendFormGrp : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  /**
   * First name of the new user
   */
  @ViewChild('firstname') firstname : FirstnameInputComponent;
  /**
   * Last name of the new user
   */
  @ViewChild('lastname') lastname : LastnameInputComponent;
  /**
   * Email of the new user
   */
  @ViewChild('email') email : EmailInputComponent;

  constructor(
    private _changerDetectorReg : ChangeDetectorRef,
    private _strUtilsService : StrUtilsService
  ) {}

  public ngAfterContentInit (): void {
    this.grp = new FormBuilder().group(
      {
        firstname: this.firstname.ctrl,
        lastname: this.lastname.ctrl,
        email: this.email.ctrl
      }
    )
    this.sendFormGrp.emit(this.grp);
  }

  public ngOnInit() : void {
    this._changerDetectorReg.detectChanges();
  }

  /**
   * Fonction to update the email input with the lastname et firstname previously completed in order to create an ALTEN email
   * and fill the email field with the email.
   */
  autoCompleteEmail() : void {
    let firstname = this._strUtilsService.normalizeName(this.grp.get(FIRSTNAME_KEY).value);
    let lastname = this._strUtilsService.normalizeName(this.grp.get(LASTNAME_KEY).value);
    let emailLocalPart = (firstname != '') ? 
                  firstname + ((lastname != '') ?
                    '.' + lastname : '') : lastname;
    this.grp.get(EMAIL_KEY).setValue(emailLocalPart + '@alten.com');
  }
}