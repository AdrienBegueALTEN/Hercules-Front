import { CtrlError } from './../../_enums/ctrl-error.enum';
import { Component } from '@angular/core';
import { MyInput } from '../input';
import { FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { InputType } from 'src/app/_enums/input-type.enum';

@Component({
  selector: 'app-lastname-input',
  templateUrl: '../input.html',
  styleUrls: ['../input.scss']
})
export class LastnameInputComponent extends MyInput {
  constructor() { super("Nom", InputType.TEXT); }

  ngOnInit() : void {
    const value = (this.initialValue && typeof this.initialValue === 'string') ? this.initialValue : '';
    this.ctrl = new FormControl(value, [Validators.pattern(AppSettings.NAME_PATTERN), Validators.maxLength(100)]);
    super.ngOnInit();
  }

  public getError() : string {
    return  this.ctrl.hasError(CtrlError.REQUIRED) ? 'Le nom doit être renseigné' :
            this.ctrl.hasError(CtrlError.MAX_LENGTH) ? 'Le nom est trop long' :
            this.ctrl.hasError(CtrlError.PATTERN) ? 'Le nom ne peut contenir que des lettres, éventuellement séparées pas un espace ou un tiret' : '';
  }
}
