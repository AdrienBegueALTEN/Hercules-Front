import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConsultantService } from '../_services/consultant.service';
import { BasicConsultant } from '../_interface/basic-consultant';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeactivateComponent } from './deactivate/deactivate.component';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConsultantsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['firstname', 'lastname', 'email', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort; 

  constructor(private consultantService: ConsultantService, private _bottomSheet: MatBottomSheet) {
  }
  ngOnInit() {
    this.consultantService.getAll().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.printData(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
      },
      (err) => {
        console.log(err);
      }
    )
    
    
    
  }

  openBottomSheet(element:any): void {
    const bootomSheet = this._bottomSheet.open(DeactivateComponent,{
      data: { consultant: element },
    });
  }

  printData(data): void{
    console.log(data);
  }

  /**
   * Surch in sub-object
   * @param search 
   * @param data 
   * @param key 
   */
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

