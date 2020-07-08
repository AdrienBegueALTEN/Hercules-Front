import { DateUtilsService } from './../../_services/utils/dateUtils.service';
import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { isUndefined } from 'util';

/**
 * Handles data need for the tables
 */
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
 /**
   * Label is used to know which dialog box to display to the user
   */
  @Input() label : string;
 /**
   * True : Shows the new data
   * False : Doesn't show the new data
   */
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

  /**
   * If event is emitted, an user is deactivated
   */
  @Output() deactivate : EventEmitter<any> = new EventEmitter<any>();
  /**
   * If event is emitted, a new element is created
   */
  @Output() newElement : EventEmitter<void> = new EventEmitter<void>();
  /**
   * Event is triggered when a row is clicked
   */
  @Output() rowClicked : EventEmitter<number> = new EventEmitter<number>();

  /**
   * Event is triggered when an user is set as admin
   */
  @Output() setAdmin : EventEmitter<any> = new EventEmitter<any>();

  /**
   * Paginates the table, allows the user to select the number of items per page and to browse next pages
   */
  @ViewChild('paginator') paginator: MatPaginator;
  /**
   * Allows content to be sorted
   */
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _authService : AuthService,
    private _dateUtils : DateUtilsService,
    private _dialogUtils : DialogUtilsService
  ) {}

  public ngAfterViewInit(): void {
    this._sortAndPagination();
  }

  public ngOnChanges() : void {
    this._sortAndPagination();
  }

  /**
   * Sorts the datasource by the chosen column
   */
  private _sortAndPagination() : void {
    this.dataSource.sortingDataAccessor = (item, header) => {
      switch (header) {
        case 'releaseDate' :
          return (!!item.releaseDate ? '2' : '1').concat(item.firstname, item.lastname);
        case 'admin' :
          return (item.admin ? '1' : '2').concat(item.firstname, item.lastname);
        case 'missionNb' :
          return (item.missions.length);
        case 'manager' :
          return item.manager.firstname + item.manager.lastname;
        default :
          return item[header];
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Apply a filter on the datasource by the string entered 
   * @param event Even is triggered when an user types anything on the basic search bar
   */
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

  /**
   * Sets a release date for an user
   * @param index Index of the chosen user
   * @param user Chosen user
   */
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

  /**
   * Checks if the user is still active.
   * An user isn't active if :
   * -a release date was set
   * -the set release date is reached
   * @param user User to check for activity
   * @returns Returns whether the user is active
   */
  public userIsActive(user : any) : boolean {
    return this._dateUtils.userIsActive(user);
  }
}
