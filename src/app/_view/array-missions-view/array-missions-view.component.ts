import { SheetStatus } from 'src/app/_enums/sheet-status.enum';
import { Component, OnInit, Input, QueryList, ViewChild, ViewChildren, Output, EventEmitter} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from 'src/app/_services/auth.service';
import { MissionService } from 'src/app/_services/mission.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-array-missions-view',
  templateUrl: './array-missions-view.component.html',
  styleUrls: ['./array-missions-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArrayMissionsViewComponent implements OnInit {
  @Input() missions : any[];
  @Input() showOnlyMineToogle : boolean = false;
  @Input() displayedColumns : string[] = ['select', 'title', 'consultant', 'customer', 'city', 'manager', 'numberOfProjects', 'sheetStatus'];

  readonly NB_MAX_CHECK : number = 1;

  @Output() deleteEvent = new EventEmitter<any>();

  onlyMine = true;
  dataSource: MatTableDataSource<any>;
  dataSourceProjects: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  searchValue:string = null;

  public user : any = this._authService.getUser();
  public userIsManager : boolean = this._authService.userIsManager();

  innerDisplayedColumns: string[] = ['select', 'project-name', 'project-description'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren(MatInput) matInputs: QueryList<MatInput>;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  constructor(
    private _authService: AuthService,
    private _missionService: MissionService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.refreshDatasource();
  }

  public refreshDatasource(revert : boolean = false) {
    this.selection.clear()
    let data = this.missions;
    if (this.userIsManager && revert ? !this.onlyMine : this.onlyMine) {
      data = data.filter((mission) => mission.consultant.manager.id === this.user.id);
    }
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'title': return item.lastVersion.title;
        case 'consultant': return item.consultant.firstname;
        case 'customer': return item.customer.name;
        case 'city': return item.lastVersion.city;
        case 'manager': return item.consultant.manager.firstname;
        case 'sheetStatus': return item.sheetStatus;
        case 'numberOfProjects': return item.lastVersion.projects?.length;
        default: return item[property];
      }

    };

    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

  }



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

  public getNbCheckableRow() : number {
    return this.dataSource.data
      .filter(row => row.sheetStatus === SheetStatus.VALIDATED)
      .length;
  }

  public masterToggle() : void {
    if (this.selection.selected.length === this.NB_MAX_CHECK)
      this.selection.clear();
    else {
      let row = 0;
      while (row < this.dataSource.data.length && this.selection.selected.length < this.NB_MAX_CHECK) {
        if (this.dataSource.data[row].sheetStatus === SheetStatus.VALIDATED)
          this.selection.select(this.dataSource.data[row]);
        row++;
      };
    }
  }

onGeneratePDF(selectedElements : any[]) : void {
    let elements : any[] = [];
    selectedElements.forEach( function (value){
      if(!!value.customer){
        elements.push({
          id : value.id,
          customer : value.customer.id,
          consultant : value.consultant.id,
          type : "m"
        });
      }
      else{
        elements.push({
          id : value.id,
          type : "p"
        });
      }
    });
    this._missionService.generatePDF(elements).subscribe(
      () => {},
      (error) => {console.log(error);}
    );


  }
  onClick(event, row) {
    if (this.selection.selected.length >= this.NB_MAX_CHECK && !(this.selection.isSelected(row))) {
      event.preventDefault();
      this._snackBar.open(
        'Vous avez dépassé le nombre d\'éléments sélectionnés autorisé : ' + this.NB_MAX_CHECK,
        'X',
        { duration: 2000 });
    }
  }

  SnackBarMessage() {
    if (this.selection.selected.length >= this.NB_MAX_CHECK) {
      this._snackBar.open('Vous avez dépassé le nombre d\'éléments sélectionnés autorisé : ' + this.NB_MAX_CHECK, 'X', { duration: 2000 });
    }
  }

  onClickProjects(event) {
    event.preventDefault();
  }

}