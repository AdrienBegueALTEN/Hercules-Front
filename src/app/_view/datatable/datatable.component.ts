import { AuthService } from 'src/app/_services/auth.service';
import { DeactivateComponent } from 'src/app/_dialog/deactivate/deactivate.component';
import { Component, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements AfterViewInit,OnChanges {
  @Input() columnsToDisplay : string [];
  @Input() dataSource: MatTableDataSource<any>;
  @Input() label : string;
  @Input() showAdd : boolean = false;

  readonly loggedUser : number = this._authService.getUser().id;
  readonly loggedUserIsManager : boolean = this._authService.userIsManager();
  readonly loggedUserIsAdmin : boolean = this._authService.userIsAdmin();

  @Output() deactivate : EventEmitter<any> = new EventEmitter<any>();
  @Output() newElement : EventEmitter<void> = new EventEmitter<void>();
  @Output() rowClicked : EventEmitter<number> = new EventEmitter<number>();
  @Output() setAdmin : EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _authService: AuthService,
    private _dialog: MatDialog
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
      else return item[header];
    };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(event: Event) : void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onRow(elementId : number) : void {
    this.rowClicked.emit(elementId);
  }

  public onDeactivate(index : number, user : any) : void {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          firstname : user.firsrname,
          lastname : user.lastname
        };
    const dialogRef = this._dialog.open(DeactivateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      releaseDate => {
        if (releaseDate)
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
