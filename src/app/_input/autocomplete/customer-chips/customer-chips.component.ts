import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';

/**
 * Autocomplete component for customers
 */
const _filter = (name : string, value : string) : boolean => {
  return name.toLowerCase().indexOf(value) >= 0;
};

@Component({
  selector: 'app-customer-chips',
  templateUrl: './customer-chips.component.html'
})
export class CustomerChipsComponent implements OnInit {
  @Input() public customers : any[];
  
  public ctrl = new FormControl();
  public filteredCustomers : Observable<string[]>;
  public selectedCustomers : any[] = [];

  @ViewChild('input') public input: ElementRef<HTMLInputElement>;
  @ViewChild('auto') public matAutocomplete: MatAutocomplete;

  ngOnInit(): void {
    this.filteredCustomers = this.ctrl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : null)
    );
  }

  remove(fruit: string): void {
    const index = this.selectedCustomers.indexOf(fruit);

    if (index >= 0) {
      this.selectedCustomers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedCustomers.push(event.option.value);
    this.input.nativeElement.value = '';
    this.ctrl.setValue('');
  }

  /**
   * Filter the customer according to a value.
   * If none are found, it set showNewOpt to true.
   * @param name Value to look for.
   * @returns List of filtered customers
   */
  private _filter(name : string) : any[] {
    if (name == null) return null;

    const filteredValue = name.toLowerCase();
    const filteredCustomers = this.customers.filter(customer => _filter(customer.name, filteredValue));
    return filteredCustomers;
  }

    /**
   * Fuction to display a customer name if the autocomplete results.
   * @param customer Customer object
   * @returns The customer name
   */
  displayFn(customer : any) : string {
    return customer ? customer.name : '';
  }

  public getValues() : number[] {
    var values : number[] = [];
    this.selectedCustomers.forEach(customer => values.push(customer.id));
    return values;
  }
}