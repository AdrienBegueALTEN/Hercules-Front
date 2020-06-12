import { CtrlError } from './../../_enums/ctrl-error.enum';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html'
})
export class NewCustomerComponent implements OnInit {
  @Input() customers : any[];

  public readonly ACTIVITY_SECTOR_KEY : string = 'activitySector';
  public readonly NAME_KEY : string = 'name';

  public activitySectors : string[];
  public filteredActivitySectors : Observable<string[]>;
  public grp : FormGroup = new FormBuilder().group({name : ['', [Validators.required]]});

  @Output() sendFormGrp = new EventEmitter<FormGroup>();

  constructor() {}

  public ngOnInit() { this.sendFormGrp.emit(this.grp); }

  public getErrorText() : string {
    return this.grp.get(this.NAME_KEY).hasError(CtrlError.REQUIRED) ? 'Le nom du client doit être renseigné.' : '';
  }
}
