import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Role } from 'src/app/_enums/role.enum';
import { startWith, map } from 'rxjs/operators';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { AuthService } from 'src/app/_services/auth.service';

const _filterConsultant = (consultant : any, value : string) : boolean => {
  return consultant.firstname.toLowerCase().concat(' ', consultant.lastname.toLowerCase()).indexOf(value) === 0 ||
  consultant.lastname.toLowerCase().indexOf(value) === 0;
};

const _filterGrpConsultants = (consultants : any[], value : string) : any[] => {
  return consultants.filter(consultant => _filterConsultant(consultant, value));
};

@Component({
  selector: 'app-consultant-autocomplete',
  templateUrl: './consultant-autocomplete.component.html',
  styleUrls: ['./consultant-autocomplete.component.scss']
})
export class ConsultantAutocompleteComponent implements OnInit {
  ctrl = new FormControl('', [Validators.required, this._checkSelection]);
  consultants : any[];
  filteredConsultants: Observable<any[]>;
  showNewOpt : boolean = false;
  displayInGrps: boolean =false;

  @Input() canCreateNew : boolean = false;

  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  @Output() newConsultant= new EventEmitter();

  constructor(
    private _consultantService : ConsultantService,
    private _authService : AuthService
  ) {}

  ngOnInit() {
    this._initOptions();
    this.sendFormCtrl.emit(this.ctrl);
  }

  private _initOptions() {
    const user = this._authService.getUser();

    this._consultantService.getConsultants(true).subscribe(
      consultants => {
        if (user.roles.includes(Role.MANAGER)) {
          this.displayInGrps = true;
          let managerConsultants : any[] = new Array();
          let otherConsultants : any[] = new Array();
          consultants.forEach(consultant => {
            if (consultant.manager == user.id) 
              managerConsultants.push(consultant);
            else otherConsultants.push(consultant);
          });
          this.consultants = [{ 
            name : 'Mes consultants',
            consultants : managerConsultants
          }, {
            name : 'Autres consultants',
            consultants : otherConsultants
          }]
          this.filteredConsultants = this.ctrl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.firstname + ' ' + value.lastname),
            map(name => name ? this._filterGrps(name) : this._filterGrps(null))
          );
        } else {
          this.consultants = consultants;
          this.filteredConsultants = this.ctrl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.firstname + ' ' + value.lastname),
            map(name => name ? this._filter(name) : null)
          );
        }
      },
      err => { console.log(err); }
    );
  }

  displayFn(consultant : any) : string {
    return consultant ? consultant.firstname + ' ' + consultant.lastname : '';
  }

  onNew() { this.newConsultant.emit(); }

  private _filter(value : string) : any[] {
    const filterValue = value.toLowerCase();
    return this.consultants.filter(consultant => _filterConsultant(consultant, filterValue));
  }

  private _filterGrps(value : string) : any[] {
    if (value == null) {
      this.showNewOpt = false;
      return null;
    }

    const filterValue = value.toLowerCase();
    const filteredConsultants = this.consultants
      .map(grp => ({name: grp.name, consultants: _filterGrpConsultants(grp.consultants, filterValue)}))
      .filter(grp => grp.consultants.length > 0);
    this.showNewOpt = this.canCreateNew && filteredConsultants.length === 0;
    return filteredConsultants;
  }

  private _checkSelection(control) {
    return (typeof control.value == 'string') ? { 'requirements': true } : null;
  }
}