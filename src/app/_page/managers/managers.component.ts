import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/_services/manager.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {

  user ;
  dataSource : MatTableDataSource<any>;
  managerSubscription :Subscription;
  managers : any[];

  columnsToDisplay=['firstname','lastname','email','actions','admin'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private _managerService : ManagerService,
              private _authService : AuthService,
              private _router : Router,
              private _dialog : MatDialog) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() : void {
      this.managerSubscription = this._managerService.getAll().subscribe(
        (data) => { this.managers = data;
                    this.createDataSource(data); },
        (error) => { console.log(error); }
      );
  }

  createDataSource(data : any[]) : void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event : Event) : void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToCreateNewManager() : void {
    this._router.navigate(['/new-manager']);
  }

  deleteManager(element : any) : void {

  }

  openDialogDelete(element: any): void {
    const dialog = this._dialog.open(YesNoDialogComponent, {
      data: { 
        title: 'Supprimer le CDR '+element.firstname+" "+element.lastname ,
        message: 'Voulez-vous continuer ?',
        yes:'Supprimer '+element.firstname + " " + element.lastname ,
        no:'Annuler'
      }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.deleteManager(element);
        }
      }
    );
  }

}
