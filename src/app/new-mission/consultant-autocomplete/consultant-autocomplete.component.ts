import { AuthService } from 'src/app/_services/auth.service';

import { ConsultantGrp } from 'src/app/_interface/consultant-grp';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BasicConsultant } from 'src/app/_interface/basic-consultant';
import { ConsultantService } from 'src/app/_services/consultant.service';

export const _filter = (consultants : BasicConsultant[], value : string) : BasicConsultant[] => {
  return consultants.filter(consultant => 
    consultant.firstname.toLowerCase().concat(' ', consultant.lastname.toLowerCase()).indexOf(value) === 0 ||
    consultant.lastname.toLowerCase().indexOf(value) === 0);
};

@Component({
  selector: 'app-consultant-autocomplete',
  templateUrl: './consultant-autocomplete.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class ConsultantAutocompleteComponent implements OnInit {

  ctrl = new FormControl('', [Validators.required, this._checkSelection]);
  groups : ConsultantGrp[];
  filteredGrps: Observable<ConsultantGrp[]>;
  showNewOpt : boolean = false;
  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  @Output() newConsultant= new EventEmitter();

  constructor(
    private _consultantService : ConsultantService,
    private _authService : AuthService
  ) {}

  ngOnInit() {
    this.initOptions();
    this.filteredGrps = this.ctrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.firstname + ' ' + value.lastname),
        map(name => name ? this._filterGroup(name) : this._filterGroup(null))
      );
    this.sendFormCtrl.emit(this.ctrl);
  }

  private initOptions() {
    const manager = this._authService.getUser().id;
    var managerConsultants : BasicConsultant[] = new Array();
    var otherConsultants : BasicConsultant[] = new Array();

    this._consultantService.getEnabledConsultants().subscribe(
      consultants => {
        consultants.forEach(consultant => {
          if (consultant.manager == manager) 
            managerConsultants.push(consultant);
          else otherConsultants.push(consultant);
        });
        this.groups = [{ 
          name : 'Mes consultants',
          consultants : managerConsultants
        }, {
          name : 'Autres consultants',
          consultants : otherConsultants
        }]
      },
      err => { console.log(err); }
    );
  }

  displayFn(consultant : BasicConsultant) : string {
    return consultant ? consultant.firstname + ' ' + consultant.lastname : '';
  }

  onNew() { this.newConsultant.emit(); }

  selectConsultant(id : number) {
    this.ctrl.setValue(this._getConsultantById(id));
  }

  private _filterGroup(value : string) : ConsultantGrp[] {
    if (value == null) {
      this.showNewOpt = false;
      return null;
    }

    const filterValue = value.toLowerCase();
    const filteredConsultants = this.groups
      .map(grp => ({name: grp.name, consultants: _filter(grp.consultants, filterValue)}))
      .filter(grp => grp.consultants.length > 0);
    this.showNewOpt = filteredConsultants.length === 0;
    return filteredConsultants;
  }

  private _checkSelection(control) {
    return (typeof control.value == 'string') ? { 'requirements': true } : null;
  }

  private _getConsultantById(id : number) {
    let i : number = 0;
    let j : number = 0;
    let res : BasicConsultant = null;

    while (i < this.groups.length && res == null) {
      while (j < this.groups[i].consultants.length && res == null) {
        if (this.groups[i].consultants[j].id !== id) ++j;
        else res = this.groups[i].consultants[j];
      }
      ++i;
    }
    return res;
  }

}