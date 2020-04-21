
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class NewCustomerComponent implements OnInit {
  formGrp : FormGroup;
  @Output() dirtyValues = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit() {
    this.createForm();
    this.onKeyDown();
  }

  createForm() {
    this.formGrp = new FormBuilder().group({
      'name' : ['', [Validators.required]],
      'activity_sector' : ['', [Validators.required]]
    });
  }

  getNameErr() : string {
    return  this.formGrp.get('name').hasError('required') ? 'Nom obligatoire' : '';
  }

  getActivitySectorErr() : string {
    return  this.formGrp.get('activity_sector').hasError('required') ? 'Secteur d\'activité obligatoire' : '';
  }

  onKeyDown() { this.dirtyValues.emit(this.formGrp); }
}
