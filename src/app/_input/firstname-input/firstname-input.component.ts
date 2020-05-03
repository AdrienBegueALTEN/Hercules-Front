import { CtrlError } from './../../_enums/ctrl-error.enum';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { MyInput } from '../input';
import { InputType } from 'src/app/_enums/input-type.enum';

@Component({
  selector: 'app-firstname-input',
  templateUrl: '../input.html',
  styleUrls: ['../input.scss']
})
export class FirstnameInputComponent extends MyInput {
  constructor() {  super("Prénom", InputType.TEXT, [Validators.pattern(AppSettings.NAME_PATTERN), Validators.maxLength(100)]); }

  public getError() : string {
    return  this.ctrl.hasError(CtrlError.REQUIRED) ? 'Le prénom doit être renseigné' :
    this.ctrl.hasError(CtrlError.MAX_LENGTH) ? 'Le prénom est trop long' :
    this.ctrl.hasError(CtrlError.PATTERN) ? 'Le prénom ne peut contenir que des lettres, éventuellement séparées pas un espace ou un tiret' : '';
  }
}
