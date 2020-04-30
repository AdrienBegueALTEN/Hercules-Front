import { Component } from '@angular/core';
import { MyInput } from '../../input';
import { InputType } from 'src/app/_enums/input-type.enum';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-string-autocomplete',
  templateUrl: './string-autocomplete.component.html',
  styleUrls: ['./string-autocomplete.component.css']
})
export class StringAutocompleteComponent extends MyInput {
  constructor() { super('', InputType.TEXT); }

  ngOnInit() : void {
    const value = (this.initialValue && typeof this.initialValue === 'string') ? this.initialValue : ''
    this.ctrl = new FormControl(value, [Validators.maxLength(255)]);
    super.ngOnInit();
  }

  public getError(): string {
    throw new Error("Method not implemented.");
  }

}
