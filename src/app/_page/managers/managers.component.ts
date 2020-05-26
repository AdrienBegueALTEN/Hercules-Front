import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/_services/manager.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit,OnDestroy {

  user ;
  dataSource : MatTableDataSource<any>;
  managerSubscription :Subscription;
  managers : any[];
  isAuthenticated : boolean = false;

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

  ngOnDestroy() : void {
      if(this.managerSubscription){
        this.managerSubscription.unsubscribe();
      }
  }

  initialize() : void {
    this.isAuthenticated = !!this._authService.getToken();

    if(this.isAuthenticated){
      this.user = this._authService.getUser();
    }



      this.managerSubscription = this._managerService.getAll().subscribe(
        (data) => { this.managers = data;
                    this.createDataSource(data); },
        (error) => { this.dialogMessage("Impossible de charger ces chargés de recrutement"); }
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

  changeAdmin(manager : any) : void {

    this._managerService.updateManager(manager.firstname,manager.lastname,manager.email, String(!manager.admin), manager.id).subscribe(
      () => { this.managerSubscription = this._managerService.getAll().subscribe(
                (data) => { this.managers = data;
                            this.createDataSource(data); },
                (error) => { this.dialogMessage("Impossible de charger ces chargés de recrutement"); }
            );},
      (error) => { this.dialogMessage("Les droits d'administrateurs n'ont pas pu être modifiés."); }
    );
  }

  deleteManager(element : any) : void {
    this._managerService.deleteManager(element.id).subscribe(
      () => { this.managerSubscription = this._managerService.getAll().subscribe(
                (data) => { this.managers = data;
                            this.createDataSource(data); },
                (error) => { this.dialogMessage("Impossible de charger ces chargés de recrutement"); }
      );},
      (error) => { this.openDialogError(error,element); }
    );

  }

  openDialogDelete(element: any): void {
    const dialog = this._dialog.open(YesNoDialogComponent, {
      data: { 
        title: 'Supprimer le manager '+element.firstname+" "+element.lastname ,
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

  openDialogError(error : String, manager: any) : void {
    const dialog = this._dialog.open(OkDialogComponent, {
      data: {
        title: error,
        message: manager.firstname+" "+ manager.lastname+ " n'a pas pu être supprimé",
        ok: 'Continuer'
      }
    });

    
}

  dialogMessage(message : String) : void {
    const  dialog = this._dialog.open(MessageDialogComponent, {
      data: message
    });
  }

}
