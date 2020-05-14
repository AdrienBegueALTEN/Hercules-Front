import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-recruitment-officers',
  templateUrl: './recruitment-officers.component.html',
  styleUrls: ['./recruitment-officers.component.scss']
})
export class RecruitmentOfficersComponent implements OnInit,OnDestroy {


  user;
  isAuthenticated = false;
  userIsAdmin = false;
  userIsManager = false;
  navigationSubscription : Subscription;
  recruitmentOfficers : any[];
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['firstname', 'lastname', 'email', 'status', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private recruitmentOfficerService: RecruitmentOfficerService, 
    private _bottomSheet: MatBottomSheet,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    if(this.navigationSubscription){
      this.navigationSubscription.unsubscribe();
    }

  }

  initialize() : void {
    this.isAuthenticated = !!this._authService.getToken();

    if(this.isAuthenticated){
      this.user = this._authService.getUser();
      this.userIsAdmin = this._authService.userIsAdmin();
      this.userIsManager = this._authService.userIsManager();
    }

    this.recruitmentOfficerService.getRecruitmentOfficers(false).subscribe(
      (data) => {
        this.recruitmentOfficers = data;
        this.createDatasource(data);
      },
      (err) => {
        console.log(err);
      }
    );

  }

  createDatasource(data) : void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
