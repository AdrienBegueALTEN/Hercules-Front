import { Component, OnInit, Input } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

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

  constructor() {
    this.filteredManagers = this.managerCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.managers.slice())
      );
  }
  ngOnInit(): void {
    console.log(this.consultant);
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.managers.filter(m => m.email.toLowerCase().includes(filterValue));
  }
}
