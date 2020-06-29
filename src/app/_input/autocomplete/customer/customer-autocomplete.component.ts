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
  /**
   * List of customers
   */
  @Input() customers : any[];
  /**
   * Tell the user writing right
   */
  @Input() canCreateNew : boolean = false;
  /**
   * A value is required
   */
  @Input() required : boolean = false;

  /**
   * From control of the input
   */
  public ctrl : FormControl;
  /**
   * Array of filtered customer
   */
  public filteredCustomers : Observable<any[]>;
  /**
   * Boolean to tell if the add button mmust be shown
   */
  public showNewOpt : boolean = false;

  /**
   * Event containing the from control sent on creation of this component.
   */
  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  /**
   * Event when the add button is clicked
   */
  @Output() newCustomer = new EventEmitter();

  constructor() {
    var validators : ValidatorFn[] = [this._checkSelection];
    if (this.required) validators.push(Validators.required);
    this.ctrl = new FormControl('', validators);
  }

  /**
   * Initialize the autocompletre component with the filtering function.
   */
  ngOnInit() {
    this.filteredCustomers = this.ctrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this._filter(null))
      );
    this.sendFormCtrl.emit(this.ctrl);
  }

  /**
   * Fuction to display a customer name if the autocomplete results.
   * @param customer Customer object
   */
  displayFn(customer : any) : string {
    return customer ? customer.name : '';
  }
  
  /**
   * When the new button is clicked, the newCustomer event is emitted.
   */
  onNew() { this.newCustomer.emit(); }

  /**
   * Filter the customer according to a value.
   * If none are found, it set showNewOpt to true.
   * @param name Value to look for.
   */
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

  /**
   * Check if the control value is of type string.
   * @param control From control to check
   */
  private _checkSelection(control) {
    return (typeof control.value == 'string') ? { 'requirements': true } : null;
  }
}