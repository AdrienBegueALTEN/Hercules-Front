import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const _filter = (name : string, value : string) : boolean => {
  return name.toLowerCase().indexOf(value) >= 0;
};

@Component({
  selector: 'app-missions-activitysector-autocomplete',
  templateUrl: './missions-activitysector-autocomplete.component.html',
  styleUrls: ['./missions-activitysector-autocomplete.component.scss']
})
export class MissionsActivitysectorAutocompleteComponent implements OnInit {

  activitySectorCtrl = new FormControl('', [Validators.required, this._checkSelection]);
  //activitySectorCtrl = new FormControl();
  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  @Input() missions : any[];
  filteredActivitySectors : Observable<any[]>;
  activitySectorInput : string;
  minLength=1;

  constructor() { }

  ngOnInit(): void {


    this.filteredActivitySectors = this.activitySectorCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.customer.activitySector),
      map(activitySector => activitySector ? this._filter(activitySector) : this._filter("")),

    );

    
  }



  private _filter(name : string) : any[] {
    

    if(name && name.length >= this.minLength){
    const filteredValue = name.toLowerCase();
    const filteredActivitySectors = this.missions.filter(mission => _filter(mission.customer.activitySector, filteredValue));
    //this.uniques(filteredActivitySectors, "activitySector");
    //console.log(this.activitySectorInput);
    return this.uniques(filteredActivitySectors, "activitySector");
    //return filteredActivitySectors;
    
  }
  else 
  {
    return [];
  }
  //return filteredCountries;
}



  
  private _checkSelection(control) {
    return (typeof control.value == 'string') ? { 'requirements': true } : null;
  }
  

 displayFn(mission : any) : string {
  return mission ? mission.customer.activitySector : '';
}

uniques(array, key) {
  return array.reduce((acc, curr) => {
    if (!acc.find(item => item[key] === curr[key])) { acc.push(curr); }
    return acc;
  }, []);
}


}
