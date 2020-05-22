import { Component, OnInit, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';
import { AuthService } from 'src/app/_services/auth.service';
import { MissionService } from 'src/app/_services/mission.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { Role } from 'src/app/_enums/role.enum';

@Component({
  selector: 'app-array-missions-view',
  templateUrl: './array-missions-view.component.html',
  styleUrls: ['./array-missions-view.component.scss']
})
export class ArrayMissionsViewComponent implements OnInit {
  @Input() missions: any[];
  @Input() displayedColumns: string[] = ['select', 'title', 'consultant', 'customer', 'city', 'manager', 'numberOfProjects', 'sheetStatus'];

  user;
  isAuthenticated = false;
  userIsAdmin = false;
  userIsManager = false;
  userIsManagerInclude = false;
  checkBoxDisabled = true;
  onlyMyValidatedMissions = false;
  checked = false;

  userIsConsultantManager: boolean = false;
  userId: number = null;

  onlyMyMissionsChecked = true;
  dataSource: MatTableDataSource<any>;
  dataSourceProjects: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  innerDisplayedColumns: string[] = ['select', 'project-name', 'project-description'];



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren(MatInput) matInputs: QueryList<MatInput>;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');


  constructor(
    private _authService: AuthService,
    private _missionService: MissionService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const user = this._authService.getUser();
    this.userIsManagerInclude = user.roles.includes(Role.MANAGER);

    this.userId = this._authService.getUser().id;
    this.isAuthenticated = !!this._authService.getToken();

    if (this.isAuthenticated) {
      this.user = this._authService.getUser();
      this.userIsAdmin = user.roles.includes(Role.ADMIN)
      this.userIsManager = this.userIsAdmin || user.roles.includes(Role.MANAGER);
    }

    this.createDatasource(this.missions);


  }



  createDatasource(data) {
    if (this.onlyMyMissionsChecked && this.userIsManagerInclude) {
      this.dataSource = new MatTableDataSource(data.filter((miss) => miss.consultant.manager.id == this.user.id));
      if (this.onlyMyValidatedMissions && this.userIsManagerInclude) {
        this.dataSource = new MatTableDataSource(data.filter((miss) => miss.sheetStatus == "ON_GOING" || miss.sheetStatus == "ON_WAITING"));
      }
    }
    else {
      this.dataSource = new MatTableDataSource(data);

    }
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


  showOnlyMyMissions() {

    this.onlyMyMissionsChecked = !this.onlyMyMissionsChecked;
    this.createDatasource(this.missions);

    if (this.onlyMyMissionsChecked && this.onlyMyValidatedMissions) {

      this.onlyMyValidatedMissions = !this.onlyMyValidatedMissions;
      this.createDatasource(this.missions);

    }

  }


  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }



  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  showOnlyMyValidatedMissions() {
    this.onlyMyValidatedMissions = !this.onlyMyValidatedMissions;
    this.createDatasource(this.missions);
  }

  private delete(mission: any) {
    this._missionService.deleteMission(mission.id).subscribe(
      () => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  openDeleteDialog(element: any): void {
    const dialog = this._dialog.open(YesNoDialogComponent, {
      data: {
        title: 'Supprimer la mission ' + element.lastVersion.title + ' chez ' + element.customer.name + '.',
        message: 'Voulez-vous continuer ?',
        yes: 'Supprimer la mission ' + element.lastVersion.title,
        no: 'Annuler'
      },
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.delete(element);
        }
      }
    );
  }

  clickEvt(e) {
    e.preventDefault();
    console.log(e);
  }



  changeValue(element: any) {
    const input = this.matInputs.find(matInput => matInput.id === element.sheetStatus);
    //console.log(this.matInputs.find(matInput => matInput.id === element.sheetStatus));
  }

}
