import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';

/**
 * Manages the activity sector chips in the advanced search fields
 */
@Component({
  selector: 'app-activity-sector-chips',
  templateUrl: './activity-sector-chips.component.html'
})
export class ActivitySectorChipsComponent implements OnInit {
  /**
   * Array containing all activity sectors
   */
  @Input() public customers : any[];
  
  /**
   * Form control
   */
  public ctrl = new FormControl();
  /**
   * Filtered sector by user input
   */
  public filteredSectors : Observable<string[]>;
  /**
   * Selected sectors by customers
   */
  public selectedSectors : string[] = [];
  /**
   * Contains all activity sectors
   */
  public sectors : string [];

  /**
   * Gets the user input from child component
   */
  @ViewChild('input') public input: ElementRef<HTMLInputElement>;
  /**
   * Autocomplete child component
   */
  @ViewChild('auto') public matAutocomplete: MatAutocomplete;

  public ngOnInit() : void {
    this.sectors = this._getActivitySectorsSet(this.customers);
    this.filteredSectors = this.ctrl.valueChanges
      .pipe(startWith(''), map(value => this._filter(value)));
  }

  /**
   * Removes an activity sector
   * @param sector Activity sector to remove
   */
  public remove(sector : string) : void {
    const index = this.selectedSectors.indexOf(sector);
    if (index >= 0)
      this.selectedSectors.splice(index, 1);
  }

  /**
   * Manage the selection of an activity sector
   */
  public selected(event: MatAutocompleteSelectedEvent) : void {
    this.selectedSectors.push(event.option.value);
    this.input.nativeElement.value = '';
    this.ctrl.setValue('');
  }

  /**
   * Filter function for the autocomplete.
   * @param value Value to look for
   * @returns list of filtered sectors
   */
  private _filter(value : string) : string[] {
    const filter = value.toLowerCase();
    const filteredSectors = this.sectors.filter(
      sector => sector.toLowerCase().indexOf(filter) >= 0);
    return filteredSectors;
  }

  /**
   * Return all activity sector taken from a list of customers.
   * @param customers List of customer
   * @returns List of all sectors
   */
  private _getActivitySectorsSet(customers : any[]) : string[] {
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
