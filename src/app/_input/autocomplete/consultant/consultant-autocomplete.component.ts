import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
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
  templateUrl: './consultant-autocomplete.component.html'
})
export class ConsultantAutocompleteComponent implements OnInit {
  /**
   * The user has creation right.
   */
  @Input() canCreateNew : boolean = false;
  /**
   * A value is required.
   */
  @Input() required : boolean = false;
  @Input() consultants : any[];

  public ctrl : FormControl;
  filteredConsultants: Observable<any[]>;
  /**
   * Boolean to tell if a add button mush be displayed in the lsit of results when no consultant can be found.
   */
  showNewOpt : boolean = false;
  displayInGrps: boolean = false;

  @Output() sendFormCtrl = new EventEmitter<FormControl>();
  @Output() newConsultant= new EventEmitter();

  constructor(private _authService : AuthService) {
    var validators : ValidatorFn[] = [this._checkSelection];
    if (this.required) validators.push(Validators.required);
    this.ctrl = new FormControl('', validators);
  }

  ngOnInit() {
    this._initOptions();
    this.sendFormCtrl.emit(this.ctrl);
  }

  /**
   * Initialize two arrays of consultants : one for the connected manager's consultants,
   * and the second for the other consultants.
   * It also prepares the autocomplete results array with the two groups of consultants.
   */
  private _initOptions() {
    const user = this._authService.getUser();
    if (this._authService.userIsManager()) {
      this.displayInGrps = true;
      let managerConsultants : any[] = new Array();
      let otherConsultants : any[] = new Array();
      this.consultants.forEach(consultant => {
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
      this.filteredConsultants = this.ctrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.firstname + ' ' + value.lastname),
        map(name => name ? this._filter(name) : null)
      );
    }
  }

  /**
   * Function to display a consutlant in the results of the autocomplete. 
   * It show the firstname and lastname of a consutlant.
   * @param consultant Constultant to display
   * @returns Identity of a consultant as a string
   */
  displayFn(consultant : any) : string {
    return consultant ? consultant.firstname + ' ' + consultant.lastname : '';
  }

  /**
   * Send an event when the add button is clicked.
   */
  onNew() { this.newConsultant.emit(); }

  /**
   * Update the 
   * @param value Value from the HTML input
   * @returns List of filtered consutlant
   */
  private _filter(value : string) : any[] {
    const filterValue = value.toLowerCase();
    return this.consultants.filter(consultant => _filterConsultant(consultant, filterValue));
  }

  /**
   * Create both list of consultant results depending on the input value.
   * If there is no results, then the showNewOpt is set to true.
   * @param value 
   * @returns two groups of filtered consultants
   */
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

  /**
   * Check if a control value is a string.
   * It returns an object saying the requirements are good if the control.
   * @param control 
   * @returns \{ 'requirements': true \} if control value is a string
   */
  private _checkSelection(control) {
    return (typeof control.value == 'string') ? { 'requirements': true } : null;
  }

  public getValue(){
    return this.ctrl.value;
  }
  
}