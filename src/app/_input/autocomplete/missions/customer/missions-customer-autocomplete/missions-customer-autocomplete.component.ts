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
  selector: 'app-missions-customer-autocomplete',
  templateUrl: './missions-customer-autocomplete.component.html',
  styleUrls: ['./missions-customer-autocomplete.component.scss']
})
export class MissionsCustomerAutocompleteComponent implements OnInit {

  //customerCtrl = new FormControl('', [Validators.required, this._checkSelection]);
  customerCtrl = new FormControl();
  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  @Input() missions : any[];
  filteredCustomers : Observable<any[]>;
  minLength=1;

  constructor() { }

  ngOnInit(): void {


    this.filteredCustomers = this.customerCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.customer.name),
      map(name => name ? this._filter(name) : this._filter("")),

    );

  }



  private _filter(name : string) : any[] {
    
    if(name && name.length >= this.minLength){
    const filteredValue = name.toLowerCase();
    const filteredCustomers = this.missions.filter(mission => _filter(mission.customer.name, filteredValue));
    return this.uniques(filteredCustomers, "name");
  }

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
  return mission ? mission.customer.name : '';
}

uniques(array, key) {
  return array.reduce((acc, curr) => {
    if (!acc.find(item => item[key] === curr[key])) { acc.push(curr); }
    return acc;
  }, []);
}



public getValue(){
  const val = this.customerCtrl.value;
  if(val == null) return null;
  else if(val instanceof String || typeof val ==='string') return val;
  else return val.customer.name;
}

}
