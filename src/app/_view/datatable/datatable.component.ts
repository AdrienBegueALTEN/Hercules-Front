import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { isUndefined } from 'util';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements AfterViewInit,OnChanges {

  /**
   * Columns displayed by the table
   */
  @Input() columnsToDisplay : string [];
  /**
   * Gets the table contents from child component
   */
  @Input() dataSource: MatTableDataSource<any>;
  @Input() label : string;
  @Input() showAdd : boolean = false;

  /**
   * Gets user id from authService
   */
  readonly loggedUser : number = this._authService.getUser().id;
  /**
   * True : User is Manager
   * False : User is not a Manager
   */
  readonly loggedUserIsManager : boolean = this._authService.userIsManager();
  /**
   * True : User is Admin
   * False : User is not an Admin
   */
  readonly loggedUserIsAdmin : boolean = this._authService.userIsAdmin();

  @Output() deactivate : EventEmitter<any> = new EventEmitter<any>();
  @Output() newElement : EventEmitter<void> = new EventEmitter<void>();
  /**
   * Event is triggered when a row is clicked
   */
  @Output() rowClicked : EventEmitter<number> = new EventEmitter<number>();

  /**
   * Event is triggered when an user is set as admin
   */
  @Output() setAdmin : EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _authService: AuthService,
    private _dialogUtils: DialogUtilsService
  ) {}

  public ngAfterViewInit(): void {
    this._sortAndPagination();
  }

  public ngOnChanges() : void {
    this._sortAndPagination();
  }

  private _sortAndPagination() : void {
    this.dataSource.sortingDataAccessor = (item, header) => {
      if (header === 'releaseDate')
        return ((!!item.releaseDate) ? "2" : "1").concat(item.lastname, item.firstname);
      else if(header==='admin')
        return (item.admin ? "1" : "2").concat(item.lastname, item.firstname);
      else if(header==='missionNb')
        return (item.missions.length);
      else return item[header];
    };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(event: Event) : void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Emits an event when a row is clicked
   * @param elementId Row ID
   */
  public onRow(elementId : number) : void {
    this.rowClicked.emit(elementId);
  }

  public onSetReleaseDate(index : number, user : any) : void {
    this._dialogUtils.showDeactivateDialog(user).afterClosed().subscribe(
      releaseDate => {
        if (!isUndefined(releaseDate))
          this.deactivate.emit(
            {
              index: index,
              user: user.id,
              releaseDate: releaseDate
            }
          )
      }
    );
  }
}
