import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const _filter = (name : string, value : string) : boolean => {
  if(name){
  return name.toLowerCase().indexOf(value) >= 0;
  }
};
@Component({
  selector: 'app-missions-city-autocomplete',
  templateUrl: './missions-city-autocomplete.component.html',
  styleUrls: ['./missions-city-autocomplete.component.scss']
})
export class MissionsCityAutocompleteComponent implements OnInit {

  //activitySectorCtrl = new FormControl('', [Validators.required, this._checkSelection]);
  cityCtrl = new FormControl();
  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  @Input() missions : any[];
  filteredCities : Observable<any[]>;
  minLength=1;

  constructor() { }

  ngOnInit(): void {


    this.filteredCities = this.cityCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => (typeof value === 'string') ? value : value.lastVersion.city),
      map(city => city ? this._filter(city) : this._filter("")),

    );

  }



  private _filter(name : string) : any[] {
    
    if(name && name.length >= this.minLength){
    const filteredValue = name.toLowerCase();
    const filteredCities = this.missions.filter(mission => _filter(mission.lastVersion.city, filteredValue));
    //console.log(this.uniques(filteredCities, "city"));
    return this.uniques(filteredCities, "city");
    
  }
  else 
  {
    return [];
  }

}
  

  
  private _checkSelection(control) {
    return (typeof control.value == 'string') ? { 'requirements': true } : null;
  }
  

 displayFn(mission : any) : string {
  return mission ? mission.lastVersion.city : '';
}

uniques(array, key) {
  return array.reduce((acc, curr) => {
    if (!acc.find(item => item[key] === curr[key])) { acc.push(curr); }
    return acc;
  }, []);
}

}
