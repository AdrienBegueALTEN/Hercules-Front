import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Input, EventEmitter, Output, OnInit } from '@angular/core';
import { InputType as InpuType } from '../_enums/input-type.enum';

export abstract class MyInput implements OnInit {
  @Input() initialValue : any = "";
  @Input() label : string;
  @Input() required : boolean = false;
  
  /**
   * Form control
   */
  ctrl : FormControl;
  /**
   * Type of input
   */
  type : InpuType;
  /**
   * Field validators
   */
  validators : ValidatorFn[]

  @Output() sendCtrl = new EventEmitter<FormControl>();
  @Output() valueChange : EventEmitter<void> = new EventEmitter();

  constructor(label : string, type : InpuType, validators : ValidatorFn[]) {
    this.label = label;
    this.type = type;
    this.validators = validators;
  }

  ngOnInit() : void {
    if (this.required)
      this.validators.push(Validators.required);
    this.ctrl = new FormControl(this.initialValue, this.validators)
    this.sendCtrl.emit(this.ctrl);
  }

/**
 * Gets the error
 */
  public abstract getError() : string
}
