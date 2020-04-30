import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Input, EventEmitter, Output, OnInit } from '@angular/core';
import { InputType as InpuType } from '../_enums/input-type.enum';

export abstract class MyInput implements OnInit {
  @Input() initialValue : any;
  @Input() label : string;
  @Input() required : boolean = false;
  
  ctrl : FormControl;
  type : InpuType;

  @Output() sendCtrl = new EventEmitter<FormControl>();
  @Output() valueChange : EventEmitter<void> = new EventEmitter();

  constructor(label : string, type : InpuType) {
    this.label = label;
    this.type = type;
  }

  ngOnInit() : void {
    if (this.required)
      this.ctrl.setValidators(Validators.required);
    this.sendCtrl.emit(this.ctrl);
  }

  public onChange() : void{
    this.valueChange.emit();
  }

  public abstract getError() : string
}
