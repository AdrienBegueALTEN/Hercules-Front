import { EmailInputComponent } from './../email-input/email-input.component';
import { LastnameInputComponent } from './../lastname-input/lastname-input.component';
import { FirstnameInputComponent } from './../firstname-input/firstname-input.component';
import { StrUtilsService } from '../../_services/str-utils.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

const FIRSTNAME_KEY = 'firstname';
const LASTNAME_KEY = 'lastname';
const EMAIL_KEY = 'email';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html'
})
export class NewUserComponent implements OnInit, AfterContentInit  {
  public grp : FormGroup;

  @ViewChild('firstname') firstname : FirstnameInputComponent;
  @ViewChild('lastname') lastname : LastnameInputComponent;
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
  }

  public ngOnInit() : void {
    this._changerDetectorReg.detectChanges();
  }

  addCtrl(key : string, ctrl : FormControl) : void {
    this.grp.addControl(key, ctrl);
  }

  autoCompleteEmail() : void {
    let firstname = this._strUtilsService.normalizeName(this.grp.get(FIRSTNAME_KEY).value);
    let lastname = this._strUtilsService.normalizeName(this.grp.get(LASTNAME_KEY).value);
    let emailLocalPart = (firstname != '') ? 
                  firstname + ((lastname != '') ?
                    '.' + lastname : '') : lastname;
    this.grp.get(EMAIL_KEY).setValue(emailLocalPart + '@alten.com');
  }
}