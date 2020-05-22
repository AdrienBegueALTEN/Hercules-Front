import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/_services/manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultant-manager',
  templateUrl: './consultant-manager.component.html'
})
export class ConsultantManagerComponent implements OnInit {
  @Input() consultant:any;
  @Output() managerChange = new EventEmitter<any>();
  managerCtrl = new FormControl();
  filteredManagers: Observable<any[]>;

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

  initialize(){
    this.managerCtrl.setValue(this.consultant.manager);
    this.managerService.getAll().subscribe(
      (data)=> {
        this.managers = data;
        this.filteredManagers = this.managerCtrl.valueChanges
          .pipe(
            startWith(''),
            map(state => state ? this._filterStates(state) : this.managers.slice())
          );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toString().toLowerCase();

    return this.managers.filter(m => m.email.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    if(this.managerCtrl.value!=null){
      this.managerChange.emit(this.managerCtrl.value);
    }
  }

  getManagerSelected(option){
    if(option)
      return option?.firstname+' '+option?.lastname;
    else
      return '';
  }
}
