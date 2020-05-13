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
  @Input() customer: any;
  @Output() customerChange = new EventEmitter<any>();
  activitySectorCtrl = new FormControl();
  message = "";
  sectors: string[];
  filteredSectors: Observable<string[]>;

  constructor(private _customerService: CustomerService) { }

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

  onSubmit(){
    if(this.activitySectorCtrl.value!=null){
      console.log(this.message);
      if(this.check()){
        this.customer.activitySector = this.activitySectorCtrl.value;
        this.customerChange.emit(this.customer);
      }
    }
  }

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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.sectors.filter(option => option.toLowerCase().includes(filterValue));
  }
}
