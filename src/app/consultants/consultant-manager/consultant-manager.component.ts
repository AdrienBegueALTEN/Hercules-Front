import { Component, OnInit, Input } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/_services/manager.service';

@Component({
  selector: 'app-consultant-manager',
  templateUrl: './consultant-manager.component.html',
  styleUrls: ['./consultant-manager.component.scss']
})
export class ConsultantManagerComponent implements OnInit {
  @Input() consultant:any;
  managerCtrl = new FormControl();
  filteredManagers: Observable<any[]>;

  managers: any[];

  constructor(private formBuilder: FormBuilder,
    private consultantService: ConsultantService,
    private router: Router,
    private managerService: ManagerService) {
    
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.managerCtrl.setValue(this.consultant.manager);
    this.managerService.getAll(true).subscribe(
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
    const filterValue = value.toLowerCase();

    return this.managers.filter(m => m.email.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    if(this.managerCtrl.value!=null){
      const json = {
        fieldName: 'manager',
        value:this.managerCtrl.value.id,
        id:this.consultant.id
      }
      this.consultantService.updateConsultant(json).subscribe(
        () => {},
        (err) => {
          console.log(err);
        }
      )
      this.router.navigateByUrl('/consultants');
    }
  }

  getManagerSelected(option){
    if(option)
      return option?.firstname+' '+option?.lastname;
    else
      return '';
  }
}
