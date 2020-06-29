import { CtrlError } from './../../_enums/ctrl-error.enum';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html'
})
export class NewCustomerComponent implements OnInit {
  /** Input list of customers */
  @Input() customers : any[];
  /** Object key corresponding to the activity sector */
  public readonly ACTIVITY_SECTOR_KEY : string = 'activitySector';
  /** Object key corresponding to the customer name */
  public readonly NAME_KEY : string = 'name';
  /** List of activity sectors */
  public activitySectors : string[];
  /** Observable list of filtered activity sectors */
  public filteredActivitySectors : Observable<string[]>;
  /** Form group to create a customer */
  public grp : FormGroup = new FormBuilder().group({name : ['', [Validators.required]]});
  /** Event containing the customer form group */
  @Output() sendFormGrp = new EventEmitter<FormGroup>();

  constructor() {}

  public ngOnInit() { this.sendFormGrp.emit(this.grp); }

  /**
   * Create an error message if the name is not present
   */
  public getErrorText() : string {
    return this.grp.get(this.NAME_KEY).hasError(CtrlError.REQUIRED) ? 'Le nom du client doit être renseigné.' : '';
  }
}
