import { Component } from '@angular/core';
import { MyInput } from '../input';
import { Validators, FormControl } from '@angular/forms';
import { CtrlError } from 'src/app/_enums/ctrl-error.enum';
import { InputType } from 'src/app/_enums/input-type.enum';

@Component({
  selector: 'app-xp-input',
  templateUrl: '../input.html',
  styleUrls: ['../input.scss']
})
export class XpInputComponent extends MyInput {
  constructor() { super("Années d'expérience", InputType.NUMBER); }

  ngOnInit() : void {
    const value = (this.initialValue && typeof this.initialValue === 'number') ? this.initialValue : 0;
    this.ctrl = new FormControl(value, [Validators.min(0), Validators.maxLength(100)]);
    super.ngOnInit();
  }

   public getError() : string {
    return  this.ctrl.hasError(CtrlError.MIN) ? 'Le nombre d\'années d\'expérience ne peut pas être négatif' :
            this.ctrl.hasError(CtrlError.MAX) ? 'Le nombre d\'années d\'expérience ne peut être aussi élevé' : '';
  }
}
