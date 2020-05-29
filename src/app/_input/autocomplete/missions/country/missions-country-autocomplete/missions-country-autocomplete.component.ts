import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const _filter = (name : string, value : string) : boolean => {
  return name.toLowerCase().indexOf(value) >= 0;
};

@Component({
  selector: 'app-missions-country-autocomplete',
  templateUrl: './missions-country-autocomplete.component.html',
  styleUrls: ['./missions-country-autocomplete.component.scss']
})
export class MissionsCountryAutocompleteComponent implements OnInit {
  //customerCtrl = new FormControl('', [Validators.required, this._checkSelection]);
  countryCtrl = new FormControl();
  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  @Input() missions : any[];
  filteredCountries : Observable<any[]>;
  minLength=1;

  constructor() { }

  ngOnInit(): void {


    this.filteredCountries = this.countryCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.lastVersion.country),
      map(country => country ? this._filter(country) : this._filter("")),

    );

  }



  private _filter(name : string) : any[] {
    

    if(name && name.length >= this.minLength){
    const filteredValue = name.toLowerCase();
    const filteredCountries = this.missions.filter(mission => _filter(mission.lastVersion.country, filteredValue));
    //this.uniques(filteredActivitySectors, "activitySector");
    console.log(this.uniques(filteredCountries, "country"));
    return this.uniques(filteredCountries, "country");
    
    
    }
    else 
    {
      return [];
    }
    //return filteredCountries;
  }

  /*
  private _checkSelection(control) {
    return (typeof control.value == 'string') ? { 'requirements': true } : null;
  }
  */

 displayFn(mission : any) : string {
  return mission ? mission.lastVersion.country : '';
}

uniques(array, key) {
  return array.reduce((acc, curr) => {
    if (!acc.find(item => item[key] === curr[key])) { acc.push(curr); }
    return acc;
  }, []);
}

}
