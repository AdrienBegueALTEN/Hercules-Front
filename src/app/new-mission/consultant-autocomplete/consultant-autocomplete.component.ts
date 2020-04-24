import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ConsultantGrp } from 'src/app/_interface/consultant-grp';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BasicConsultant } from 'src/app/_interface/basic-consultant';
import { ConsultantService } from 'src/app/_services/consultant.service';

export const _filter = (consultants : BasicConsultant[], value : string) : BasicConsultant[] => {
  value = value.toLowerCase();

  return consultants.filter(consultant => 
    consultant.firstname.toLowerCase().indexOf(value) === 0 ||
    consultant.lastname.toLowerCase().indexOf(value) === 0);
};

@Component({
  selector: 'app-consultant-autocomplete',
  templateUrl: './consultant-autocomplete.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class ConsultantAutocompleteComponent implements OnInit {
  ctrl = new FormControl();
  groups : ConsultantGrp[];
  filteredGroups: Observable<ConsultantGrp[]>;
  @Output() dirtyValue = new EventEmitter<FormControl>();

  constructor(
    private _consultantService : ConsultantService,
    private _tokenStorageService : TokenStorageService
  ) {}

  ngOnInit() {
    this.initOptions();
    this.filteredGroups = this.ctrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  selectionChange() { this.dirtyValue.emit(this.ctrl); }

  private initOptions() {
    const manager = this._tokenStorageService.getUser().id;
    var managerConsultants : BasicConsultant[] = new Array();
    var otherConsultants : BasicConsultant[] = new Array();

    this._consultantService.getEnabledConsultants().subscribe(
      consultants => {
        consultants.forEach(consultant => {
          if (consultant.manager == manager) 
            managerConsultants.push(consultant);
          else otherConsultants.push(consultant);
        });
      },
      err => {
        console.log(err);
      }
    );

    this.groups = [{ 
      name : 'Mes consultants',
      consultants : managerConsultants
    }, {
      name : 'Autres consultants',
      consultants : otherConsultants
    }]
  }

  displayFn(consultant : BasicConsultant) : string {
    return consultant ? consultant.firstname + " " + consultant.lastname : "";
  }

  private _filterGroup(value: string) : ConsultantGrp[] {
    if (typeof value != 'string') return null;

    return (!value) ? this.groups.filter(grp => grp.consultants.length > 0):
      this.groups
        .map(grp => ({name: grp.name, consultants: _filter(grp.consultants, value)}))
        .filter(grp => grp.consultants.length > 0);
  }
}
