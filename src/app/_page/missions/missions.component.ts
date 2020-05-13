import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from 'src/app/_services/mission.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  user;
  isAuthenticated = false;
  userIsAdmin = false;
  userIsManager = false;
  checkBoxDisabled = true;
  onlyMyValidatedMissions = false;


  selectedIndex : number = 0;
  todayVersionIndex : number = null;
  userIsConsultantManager : boolean = false;

  onlyMyMissionsChecked = true;
  missions:any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  columnsToDisplay = ['select','title', 'consultant', 'customer', 'city', 'manager', 'sheetStatus'];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _authService : AuthService,
    private _missionService : MissionService,
    private _route : ActivatedRoute,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {


    this.isAuthenticated = !!this._authService.getToken();

    if (this.isAuthenticated) {
      this.user = this._authService.getUser();
      this.userIsAdmin = this.user.role == 'ADMIN';
      this.userIsManager = this.userIsAdmin || this.user.role == 'MANAGER';
    }



    this._missionService.getMissions(1).subscribe(
      (data) => {
        this.missions = data;
        console.log(data);
        this.createDatasource(data);
        
    
        console.log(this.dataSource);
      },
      (err) => {
        console.log(err);
      }
    )


    




  }



  createDatasource(data) {
    if (this.onlyMyMissionsChecked) {
      this.dataSource = new MatTableDataSource(data.filter((miss) => miss.consultant.manager.id == this.user.id));
      if(this.onlyMyValidatedMissions)
    {
      this.dataSource = new MatTableDataSource(data.filter((miss) => miss.sheetStatus == "ON_GOING" || miss.sheetStatus == "ON_WAITING"));
    }
    }
    else {
      this.dataSource = new MatTableDataSource(data);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'title' : return item.lastVersion.title;
        case 'consultant' : return item.consultant.firstname;
        case 'customer': return item.customer.name;
        case 'city' : return item.lastVersion.city;
        case 'manager' : return item.consultant.manager.firstname;
        case 'sheetStatus' : return item.sheetStatus;
        
        default: return item[property];
      }
      
    };

    console.log(this.dataSource);
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
  console.log(search);
  return search;
}

applyFilter(event: Event) {

  const filterValue = (event.target as HTMLInputElement).value;
  //console.log(filterValue);
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


showOnlyMyMissions() {
  this.onlyMyMissionsChecked = !this.onlyMyMissionsChecked;
  this.createDatasource(this.missions);
}


isAllSelected() {
  if(this.dataSource)
  {
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

openDeleteDialog(element: any): void {
  const dialog = this._dialog.open(YesNoDialogComponent, {
    data: { 
      title: 'Supprimer la mission '+element.lastVersion.title+' chez '+element.customer.name+'.' ,
      message: 'Voulez-vous continuer ?',
      yes:'Supprimer la mission '+element.lastVersion.title,
      no:'Annuler'
    },
  });

  dialog.afterClosed().subscribe(
    (result) => {
      if(result){
        console.log("Mission supprimée");
      }
    }
  );
}

}