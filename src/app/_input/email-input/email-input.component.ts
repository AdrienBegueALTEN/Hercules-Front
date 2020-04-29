import { CtrlError } from './../../_enums/ctrl-error.enum';
import { Component } from '@angular/core';
import { MyInput } from '../input';
import { FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-email-input',
  templateUrl: '../input.html',
  styleUrls: ['../input.scss']
})
export class EmailInputComponent extends MyInput {
  constructor() {
    super("Adresse email");
    const value = (this.initialValue && typeof this.initialValue === 'string') ? this.initialValue : ''
    this.ctrl = new FormControl(value, [Validators.required, Validators.pattern(AppSettings.EMAIL_PATTERN)]);
   }

   public getError() : string {
    return  this.ctrl.hasError(CtrlError.REQUIRED) ? 'L\'adresse email doit être renseignée' :
            this.ctrl.hasError(CtrlError.PATTERN) ? 'Le format de l\'adresse email est incorrect' : '';
  }
}
