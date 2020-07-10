import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-chips',
  templateUrl: './customer-chips.component.html'
})
export class CustomerChipsComponent implements OnInit {
  @Input() public customers : any[];
  
  public ctrl = new FormControl();
  public filteredCustomers : Observable<any[]>;
  public selectedCustomers : any[] = [];

  @ViewChild('input') public input: ElementRef<HTMLInputElement>;
  @ViewChild('auto') public matAutocomplete: MatAutocomplete;

  public ngOnInit(): void {
    this.filteredCustomers = this.ctrl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : null)
    );
  }

  /**
   * Removes a customer
   * @param customer Customer to remove
   */
  public remove(customer : string): void {
    const index = this.selectedCustomers.indexOf(customer);

    if (index >= 0) {
      this.selectedCustomers.splice(index, 1);
    }
  }

  /**
   * Manage the selection of a customer
   */
  public selected(event: MatAutocompleteSelectedEvent): void {
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
    const filteredCustomers = this.customers.filter(
      customer => { return customer.name.toLowerCase().indexOf(filteredValue) >= 0;});
    return filteredCustomers;
  }

  /**
   * Fuction to display a customer name if the autocomplete results.
   * @param customer Customer object
   * @returns The customer name
   */
  public displayFn(customer : any) : string {
    return customer ? customer.name : '';
  }
}