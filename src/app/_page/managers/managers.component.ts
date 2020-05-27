import { HttpStatus } from './../../_enums/http-status.enum';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/_services/manager.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { NewUserDialogComponent } from 'src/app/dialog/new-user/new-user-dialog.component';
import { AuthService } from 'src/app/_services/auth.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html'
})
export class ManagersComponent implements OnInit {
  public dataSource: MatTableDataSource<any>;

  readonly LABEL : string = 'manager';

  constructor(
    private _authService : AuthService,
    private _managerService : ManagerService, 
    private _dialog: MatDialog) { }

  public ngOnInit() : void {
    this._managerService.getAll().subscribe(
      (data) => this.dataSource = new MatTableDataSource(data),
      () => window.location.replace("")
    );
  }

  public newManager() : void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      label: this.LABEL,
      newManager: true
    }
    const dialogRef = this._dialog.open(NewUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (user : any) => {
        if (isUndefined(user)) return;
        this._managerService.addManager(user.email, user.firstname, user.lastname, user.isAdmin).subscribe(
          (response) => {
            const userId : number = parseInt(String(response.body));
            this._authService.passwordCreationAccess(userId).subscribe(
              blob => {
                let fileName = user.firstname + '_' + user.lastname + '.eml';
                fileName = fileName.toLowerCase();
                saveAs(blob, fileName);
              },
              () => this._showErrorDialog("Impossible de télécharger le fichier.")
            )
            this.ngOnInit()
          },
          (error) => this._handleError(error)
        )
      }
    )
  }

  public goToManagerPage(event : number) : void {
    window.location.replace('managers/' + event);
  }

  private _handleError(error : Response) {
    let message : string = "Impossible d'ajouter ce " + this.LABEL + "."
    if (error.status === HttpStatus.CONFLICT)
      message = message.concat(" L'adresse email renseignée est indisponible.");
    this._showErrorDialog(message);
  }

  private _showErrorDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

/*  user ;
  dataSource : MatTableDataSource<any>;
  dataSource2 : MatTableDataSource<any>;
  managerSubscription :Subscription;
  managers : any[];
  isAuthenticated : boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private _managerService : ManagerService,
              private _authService : AuthService,
              private _router : Router,
              private _dialog : MatDialog,
              private _snackBar: MatSnackBar) { }

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
    for(let x of data){
      if(x.releaseDate!=null)
        x.releaseDate = "Inactif"+x.firstname;
      else
        x.releaseDate = "Actif"+x.firstname;
    }
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
            );
              this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
          },
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
        yes:'Supprimer ',
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

  openDialogInactive(manager : any) : void {
    const dialog = this._dialog.open(ReleaseDateDialogComponent, {
      data: { 
        title: 'Rendre inactif le manager '+manager.firstname+" "+manager.lastname ,
        message: 'Voulez-vous continuer ?',
        yes:'Rendre inactif ',
        no:'Annuler'
      }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this._managerService.releaseManager(result,manager.id).subscribe(
            () => { this.managerSubscription = this._managerService.getAll().subscribe(
                      (data) => { this.managers = data;
                                  this.createDataSource(data); },
                      (error) => { this.dialogMessage("Impossible de charger ces chargés de recrutement"); }
                  );
                    this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
                },
            (error) => { this.dialogMessage("Le manager n'a pas pu être rendu actif."); }
          );
        }
      }
    );
  }
  
  openDialogActive(manager : any) : void {
    const dialog = this._dialog.open(YesNoDialogComponent, {
      data: { 
        title: 'Rendre actif le manager '+manager.firstname+" "+manager.lastname ,
        message: 'Voulez-vous continuer ?',
        yes:'Rendre actif ',
        no:'Annuler'
      }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this._managerService.reviveManager(manager.id).subscribe(
            () => { this.managerSubscription = this._managerService.getAll().subscribe(
                      (data) => { this.managers = data;
                                  this.createDataSource(data); },
                      (error) => { this.dialogMessage("Impossible de charger ces chargés de recrutement"); }
                  );
                    this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
                },
            (error) => { this.dialogMessage("Le manager n'a pas pu être rendu actif."); }
          );
        }
      }
    );
  }*/

}
