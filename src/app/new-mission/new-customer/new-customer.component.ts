
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class NewCustomerComponent implements OnInit {
  grp : FormGroup;
  @Output() sendFormGrp = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit() {
    this._createForm();
    this.sendFormGrp.emit(this.grp);
  }

  getNameErr() : string {
    return  this.grp.get('name').hasError('required') ? 'Le nom doit être renseigné' : '';
  }

  getActivitySectorErr() : string {
    return  this.grp.get('activitySector').hasError('required') ? 'Le secteur d\'activité doit être renseigné' : '';
  }

  _createForm() {
    this.grp = new FormBuilder().group({
      'name' : ['', [Validators.required]],
      'activitySector' : ['', [Validators.required]],
      'description' : []
    });
  }
}
