import { BasicCustomer } from './../../_interface/basic-customer';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { CustomerService } from 'src/app/_services/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-autocomplete',
  templateUrl: './customer-autocomplete.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class CustomerAutocompleteComponent implements OnInit {
  ctrl = new FormControl();
  customers : BasicCustomer[];
  filteredCustomers: Observable<BasicCustomer[]>;
  @Output() change = new EventEmitter<FormControl>();

  constructor(
    private _customerService : CustomerService
  ) {}

  ngOnInit() {
    this.initOptions();

    this.filteredCustomers = this.ctrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.customers.slice())
      );
  }

  selectionChange() { this.change.emit(this.ctrl); }

  private initOptions() {
    this._customerService.getBasicCustomers().subscribe(
      customers => { this.customers = customers; },
      err => { console.log(err); }
    );
  }

  displayFn(customer : BasicCustomer) : string {
    return customer ? customer.name : '';
  }

  private _filter(name : string): BasicCustomer[] {
    const filterValue = name.toLowerCase();

    return this.customers.filter(option => option.name.toLowerCase().indexOf(filterValue) >= 0);
  }
}