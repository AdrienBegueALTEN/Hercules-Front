import { Component, OnInit, Input } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConsultantService } from 'src/app/_services/consultant.service';

@Component({
  selector: 'app-consultant-manager',
  templateUrl: './consultant-manager.component.html',
  styleUrls: ['./consultant-manager.component.scss']
})
export class ConsultantManagerComponent implements OnInit {
  @Input() consultant:any;
  managerCtrl = new FormControl();
  filteredManagers: Observable<any[]>;

  managers: any[] = [
    {
      id:1,
      lastname: 'Admin',
      firstname: 'Admin',
      email:'admin.admin@alten.com'
    },
    {
      id:2,
      lastname: 'Manager',
      firstname: 'Manager',
      email:'manager.manager@alten.com'
    }
  ];

  constructor(private formBuilder: FormBuilder,
    private consultantService: ConsultantService) {
    this.filteredManagers = this.managerCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.managers.slice())
      );
  }

  ngOnInit(): void {
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.managers.filter(m => m.email.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    if(this.managerCtrl.value!=null){
      const cons = {
        manager:this.managerCtrl.value.id,
        id:this.consultant.id
      }
      /*this.consultantService.updateConsultant(cons).subscribe(
        () => {},
        (err) => {
          console.log(err);
        }
      )*/
      console.log(cons);
    }
  }

  getManagerSelected(option){
    if(option)
      return option?.firstname+' '+option?.lastname;
    else
      return '';
  }
}
