import { FormControl } from '@angular/forms';
import { Input, EventEmitter, Output, OnInit } from '@angular/core';

export abstract class MyInput implements OnInit {
  @Input() initialValue : any;
  
  ctrl : FormControl;
  label : string;

  @Output() sendCtrl = new EventEmitter<FormControl>();
  @Output() valueChange : EventEmitter<void> = new EventEmitter();

  constructor(label : string) {
    this.label = label;
  }

  ngOnInit() : void {
    this.sendCtrl.emit(this.ctrl);
  }

  public onChange() : void{
    this.valueChange.emit();
  }

  public abstract getError() : string
}
