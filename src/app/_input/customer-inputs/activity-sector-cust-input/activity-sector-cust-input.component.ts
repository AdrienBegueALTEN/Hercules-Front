import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/_services/customer.service';
import { Observable } from 'rxjs';
import { startWith, map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-activity-sector-cust-input',
  templateUrl: './activity-sector-cust-input.component.html',
  styleUrls: ['./activity-sector-cust-input.component.scss']
})
export class ActivitySectorCustInputComponent implements OnInit {
  /**
   * Customer object to modify
   */
  @Input() customer: any;
  /**
   * Event with the changed customer
   */
  @Output() customerChange = new EventEmitter<any>();
  /**
   * Form control
   */
  activitySectorCtrl = new FormControl();
  /**
   * Error message
   */
  message = "";
  /**
   * List of all sectors
   */
  sectors: string[];
  /**
   * Observfable list of filtered activity sectors.
   */
  filteredSectors: Observable<string[]>;

  constructor(private _customerService: CustomerService) { }

  /**
   * Initialize the array for the autocomplete and create the filtering functions.
   */
  ngOnInit(): void {
    this.activitySectorCtrl.setValue(this.customer.activitySector);
    this._customerService.getAll().subscribe(
      (data) => {
        this.sectors = Array.from(new Set(data.map(cust => cust.activitySector)));
        this.filteredSectors = this.activitySectorCtrl.valueChanges
          .pipe(
            delay(500),
            startWith(this.customer.activitySector),
            map(value => this._filter(value))
          );
      }
    );
    this.customerChange.subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }

  /**
   * When submitted, the value is checked. If it is a good value, 
   * an event is emitted with the customer changed.
   */
  onSubmit(){
    if(this.activitySectorCtrl.value!=null){
      if(this.check()){
        this.customer.activitySector = this.activitySectorCtrl.value;
        this.customerChange.emit(this.customer);
      }
    }
  }

  /**
   * Check the new activity sector. If it is the same, returns false.
   * If the input is empty, an error message appears and returns false.
   * Else return true.
   */
  check(): boolean{
    const val = this.activitySectorCtrl.value as string;
    if(val == this.customer.activitySector ){
      return false;
    }
    if(val.length<=0){
      this.message = "Le secteur d'activité doit être rempli."
      return false;
    }
    this.message = ""
    return true;
  }

  /**
   * Filtering function to search for activity sector.
   * @param value value to look for
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.sectors.filter(option => option.toLowerCase().includes(filterValue));
  }
}
