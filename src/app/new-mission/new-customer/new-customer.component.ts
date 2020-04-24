import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { BasicCustomer } from 'src/app/_interface/basic-customer';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class NewCustomerComponent implements OnInit {
  grp : FormGroup;
  @Output() sendFormGrp = new EventEmitter<FormGroup>();
  @Input() customers : BasicCustomer[];
  activitySectors : string[];
  filteredActivitySectors : Observable<string[]>;

  constructor() {}

  ngOnInit() {
    this._createForm();
    this.sendFormGrp.emit(this.grp);
    this.activitySectors = this._getActivitySectorsSet(this.customers);
    this.filteredActivitySectors = this.grp.get('activitySector').valueChanges
    .pipe(
      startWith(''),
      map(activitySector => this._filter(activitySector))
    );
  }

  getNameErr() : string {
    return  this.grp.get('name').hasError('required') ? 'Le nom doit être renseigné' : '';
  }

  getActivitySectorErr() : string {
    return  this.grp.get('activitySector').hasError('required') ? 'Le secteur d\'activité doit être renseigné' : '';
  }

  private _createForm() {
    this.grp = new FormBuilder().group({
      'name' : ['', [Validators.required]],
      'activitySector' : ['', [Validators.required]],
      'description' : []
    });
  }

  private _filter(name : string): string[] {
    const filterValue = name.toLowerCase();
    const filteredActivitySectors = this.activitySectors.filter(activitySector => activitySector.toLowerCase().indexOf(filterValue) >= 0);
    return filteredActivitySectors;
  }

  private _getActivitySectorsSet(customers : BasicCustomer[]) : string[] {
    var i, out = [], obj = {};
    for (i = 0; i < customers.length; i++) {
      obj[customers[i].activitySector] = 0;
    }
    for (i in obj) {
      out.push(i);
    }
    return out;
  }
}
