import { CtrlError } from './../../_enums/ctrl-error.enum';
import { Component } from '@angular/core';
import { MyInput } from '../input';
import { FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-lastname-input',
  templateUrl: '../input.html',
  styleUrls: ['../input.scss']
})
export class LastnameInputComponent extends MyInput {
  constructor() {
    super("Nom");
    const value = (this.initialValue && typeof this.initialValue === 'string') ? this.initialValue : ''
    this.ctrl = new FormControl(value, [Validators.required, Validators.pattern(AppSettings.NAME_PATTERN)]);
  }

  public getError() : string {
    return  this.ctrl.hasError(CtrlError.REQUIRED) ? 'Le nom doit être renseigné' :
            this.ctrl.hasError(CtrlError.PATTERN) ? 'Le nom ne peut contenir que des lettres, éventuellement séparées pas un espace ou un tiret' : '';
  }
}
