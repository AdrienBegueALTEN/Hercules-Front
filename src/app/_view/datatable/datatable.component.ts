import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Input() columnsToDisplay : string [];
  @Input() dataSource: MatTableDataSource<any>;
  @Input() label : String;

  @Output() newElement : EventEmitter<void> = new EventEmitter<void>();
  @Output() rowClicked : EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /*switch (this.userType) {
      case UserType.CONSULTANT :
        this._consultantService.getConsultants().subscribe(
          (data) => this._createDataSource(data),
          () => window.location.replace("")
        );
        break;
      case UserType.MANAGER :
        this._managerService.getAll().subscribe(
          (data) => this._createDataSource(data),
          () => window.location.replace("")
        );
        break;
      case UserType.RECRUITMENT_OFFICER :
        this._recruitmentOfficerService.getRecruitmentOfficers().subscribe(
          (data) => this._createDataSource(data),
          () => window.location.replace("")
        );
        break;
      default : window.location.replace("")
    }*/
  }

  public applyFilter(event: Event) : void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
