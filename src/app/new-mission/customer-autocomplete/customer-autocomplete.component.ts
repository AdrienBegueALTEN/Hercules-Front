import { BasicCustomer } from './../../_interface/basic-customer';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-autocomplete',
  templateUrl: './customer-autocomplete.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class CustomerAutocompleteComponent implements OnInit {
  ctrl = new FormControl('', [Validators.required, this._checkSelection]);
  @Input() customers : BasicCustomer[];
  filteredCustomers : Observable<BasicCustomer[]>;
  showNewOpt : boolean = false;
  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  @Output() newCustomer = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.filteredCustomers = this.ctrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this._filter(null))
      );
    this.sendFormCtrl.emit(this.ctrl);
  }

  displayFn(customer : BasicCustomer) : string {
    return customer ? customer.name : '';
  }
  
  onNew() { this.newCustomer.emit(); }

  private _filter(name : string): BasicCustomer[] {
    if (name == null) {
      this.showNewOpt = false;
      return null;
    }

    const filterValue = name.toLowerCase();
    const filteredCustomers = this.customers.filter(customer => customer.name.toLowerCase().indexOf(filterValue) >= 0);
    this.showNewOpt = filteredCustomers.length === 0;
    return filteredCustomers;
  }

  private _checkSelection(control) {
    return (typeof control.value == 'string') ? { 'requirements': true } : null;
  }
}