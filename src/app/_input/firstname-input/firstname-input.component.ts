import { CtrlError } from './../../_enums/ctrl-error.enum';
import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { MyInput } from '../input';

@Component({
  selector: 'app-firstname-input',
  templateUrl: '../input.html',
  styleUrls: ['../input.scss']
})
export class FirstnameInputComponent extends MyInput {
  constructor() { 
    super("Prénom");
    const value = (this.initialValue && typeof this.initialValue === 'string') ? this.initialValue : ''
    this.ctrl = new FormControl(value, [Validators.required, Validators.pattern(AppSettings.NAME_PATTERN)]);
  }

  public onChange() : void {
    super.onChange();
    let firstname : string = this.ctrl.value;
    firstname = firstname.charAt(0).toUpperCase() + firstname.substr(1);
    this.ctrl.setValue(firstname);
  }

  public getError() : string {
    return  this.ctrl.hasError(CtrlError.REQUIRED) ? 'Le prénom doit être renseigné' :
    this.ctrl.hasError(CtrlError.PATTERN) ? 'Le prénom ne peut contenir que des lettres, éventuellement séparées pas un espace ou un tiret' : '';
  }
}
