import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/_services/manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Handles the consultants managed by their manager
 */
@Component({
  selector: 'app-consultant-manager',
  templateUrl: './consultant-manager.component.html'
})
export class ConsultantManagerComponent implements OnInit {
  /**
   * The consultant to change his manager.
   */
  @Input() consultant:any;
  /**
   * Event with selected manager.
   */
  @Output() managerChange = new EventEmitter<any>();
  /**
   * Manager input control.
   */
  managerCtrl = new FormControl();
  /**
   * List of managers for the autocomplete
   */
  filteredManagers: Observable<any[]>;
  /**
   * List of all managers that can be selected.
   */
  managers: any[];

  constructor(private formBuilder: FormBuilder,
    private consultantService: ConsultantService,
    private router: Router,
    private managerService: ManagerService,
    private _snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {
    this.initialize();
  }

  /**
   * Initialise the autocomplete component : 
   * sets the current maanger name in the input,
   * retrieves all active managers
   * and initialize the filter function for the automplete.
   */
  initialize(){
    this.managerCtrl.setValue(this.consultant.manager);
    this.managerService.getAll(true).subscribe(
      (data)=> {
        this.managers = data;
        this.filteredManagers = this.managerCtrl.valueChanges
          .pipe(
            startWith(''),
            map(state => state ? this._filterManager(state) : this.managers.slice())
          );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Filtering function to search the managers which names contain the value.
   * @param value Value to look for
   * @returns List of filtered managers
   */
  private _filterManager(value: string): any[] {
    const filterValue = value.toString().toLowerCase();

    return this.managers.filter(m => m.email.toLowerCase().includes(filterValue));
  }

  /**
   * On submit, emits an event with the selected manager.
   */
  onSubmit(){
    if(this.managerCtrl.value!=null){
      this.managerChange.emit(this.managerCtrl.value);
    }
  }

  /**
   * Gets the selected manager
   * @param option 
   */
  getManagerSelected(option){
    return option.firstname+' '+option.lastname;
  }
}
