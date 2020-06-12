import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const _filter = (name : string, value : string) : boolean => {
  return name.toLowerCase().indexOf(value) >= 0;
};

@Component({
  selector: 'app-customer-autocomplete',
  templateUrl: './customer-autocomplete.component.html'
})
export class CustomerAutocompleteComponent implements OnInit {
  @Input() customers : any[];
  @Input() canCreateNew : boolean = false;
  @Input() required : boolean = false;

  public ctrl : FormControl;
  public filteredCustomers : Observable<any[]>;
  public showNewOpt : boolean = false;

  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  @Output() newCustomer = new EventEmitter();

  constructor() {
    var validators : ValidatorFn[] = [this._checkSelection];
    if (this.required) validators.push(Validators.required);
    this.ctrl = new FormControl('', validators);
  }

  ngOnInit() {
    this.filteredCustomers = this.ctrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this._filter(null))
      );
    this.sendFormCtrl.emit(this.ctrl);
  }

  displayFn(customer : any) : string {
    return customer ? customer.name : '';
  }
  
  onNew() { this.newCustomer.emit(); }

  private _filter(name : string) : any[] {
    if (name == null) {
      this.showNewOpt = false;
      return null;
    }

    const filteredValue = name.toLowerCase();
    const filteredCustomers = this.customers.filter(customer => _filter(customer.name, filteredValue));
    this.showNewOpt = this.canCreateNew && filteredCustomers.length === 0;
    return filteredCustomers;
  }

  private _checkSelection(control) {
    return (typeof control.value == 'string') ? { 'requirements': true } : null;
  }
}