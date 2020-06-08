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
  selector: 'app-missions-title-autocomplete',
  templateUrl: './missions-title-autocomplete.component.html',
  styleUrls: ['./missions-title-autocomplete.component.scss']
})
export class MissionsTitleAutocompleteComponent implements OnInit {
 //customerCtrl = new FormControl('', [Validators.required, this._checkSelection]);
 titleCtrl = new FormControl();
 @Output() sendFormCtrl = new EventEmitter<FormControl>();
 @Input() missions : any[];
 filteredTitles : Observable<any[]>;
 minLength=1;

 constructor() { }

 ngOnInit(): void {


   this.filteredTitles = this.titleCtrl.valueChanges
   .pipe(
     startWith(''),
     map(value => typeof value === 'string' ? value : value?.lastVersion.title),
     map(title => title ? this._filter(title) : this._filter("")),

   );

 }



 private _filter(name : string) : any[] {
   
  if(name && name.length >= this.minLength){
   const filteredValue = name.toLowerCase();

   const filteredTitles = this.missions.filter(mission => _filter(mission.lastVersion.title, filteredValue));
   //console.log(name);
   return filteredTitles;
 }

else 
{
  return [];
}
//return filteredCountries;
}

/*
private _filter(name : string) : any[] {
   
   const filteredValue = name.toLowerCase();

   const filteredTitles = this.missions.filter(mission => _filter(mission.lastVersion.title, filteredValue));
   return filteredTitles;
 }
*/
//return filteredCountries;


 /*
 private _checkSelection(control) {
   return (typeof control.value == 'string') ? { 'requirements': true } : null;
 }
 */

displayFn(mission : any) : string {
 return mission ? mission.lastVersion.title : '';
}

  

  public getValue(){
    const val = this.titleCtrl.value;
    if(val == null) return null;
    else if(val instanceof String || typeof val ==='string') return val;
    else return val.lastVersion.title;
  }

}
