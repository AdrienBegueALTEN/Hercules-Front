import { CtrlError } from './../../_enums/ctrl-error.enum';
import { Component } from '@angular/core';
import { MyInput } from '../input';
import { FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { InputType } from 'src/app/_enums/input-type.enum';

@Component({
  selector: 'app-email-input',
  templateUrl: '../input.html',
  styleUrls: ['../input.scss']
})
export class EmailInputComponent extends MyInput {
  constructor() { super("Adresse email", InputType.EMAIL); }

  ngOnInit() : void {
    const value = (this.initialValue && typeof this.initialValue === 'string') ? this.initialValue : '';
    this.ctrl = new FormControl(value, [Validators.pattern(AppSettings.EMAIL_PATTERN), Validators.maxLength(255)]);
    super.ngOnInit();
  }

   public getError() : string {
    return  this.ctrl.hasError(CtrlError.REQUIRED) ? 'L\'adresse email doit être renseignée' :
            this.ctrl.hasError(CtrlError.MAX_LENGTH) ? 'L\'adresse email est trop longue' :
            this.ctrl.hasError(CtrlError.PATTERN) ? 'Le format de l\'adresse email est incorrect' : '';
  }
}
