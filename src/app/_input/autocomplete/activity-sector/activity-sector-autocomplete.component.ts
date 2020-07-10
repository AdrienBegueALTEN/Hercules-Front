import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CtrlError } from 'src/app/_enums/ctrl-error.enum';

/**
 * Autocomplete component for activity sector
 */
@Component({
  selector: 'app-activity-sector-autocomplete',
  templateUrl: './activity-sector-autocomplete.component.html',
})
export class ActivitySectorAutocompleteComponent implements OnInit {
  /**
   * Gets customers from child component
   */
  @Input() customers : any[];

  /**
   * Get boolean form child component
   */
  @Input() required : boolean = false;

  /**
   * Array containing all activity sectors
   */
  activitySectors : string[];

  /**
   * Array containing the activity sectors matching the searched text
   */
  filteredActivitySectors : Observable<string[]>;
  /**
   * Form control for activity sector
   */
  public ctrl : FormControl = new FormControl('', this.required ? [Validators.required] : null);

  /**
   * Form sent to parent component
   */
  @Output() sendFormCtrl = new EventEmitter<FormControl>();

  /**
   * Initialize the activity sector array.
   */
  public ngOnInit() : void {
    this.activitySectors = this._getActivitySectorsSet(this.customers);
    this.filteredActivitySectors = this.ctrl.valueChanges
      .pipe(startWith(''), map(value => this._filter(value)));
    this.sendFormCtrl.emit(this.ctrl);
  }

  /**
   * Create the error message.
   * @returns Error message
   */ 
  public getErrorText() : string {
    return this.ctrl.hasError(CtrlError.REQUIRED) ? 'Le secteur d\'activité du client doit être renseigné.' : '';
  }

  /**
   * Filter function for the autocomplete.
   * @param value Value to look for
   * @returns list of filtered sectors
   */
  private _filter(value : string) : string[] {
    const filterValue = value.toLowerCase();
    const filteredActivitySectors = this.activitySectors.filter(activitySector => activitySector.toLowerCase().indexOf(filterValue) >= 0);
    return filteredActivitySectors;
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
