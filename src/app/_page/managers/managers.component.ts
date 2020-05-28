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
    private _dialog: MatDialog
  ) {}

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
          (error) => this._handleAddError(error)
        )
      }
    )
  }

  public goToManagerPage(manager : number) : void {
    window.location.replace('managers/' + manager);
  }

  private _handleAddError(error : Response) {
    let message : string = "Impossible d'ajouter ce " + this.LABEL + "."
    if (error.status === HttpStatus.CONFLICT)
      message = message.concat(" L'adresse email renseignée est indisponible.");
    this._showErrorDialog(message);
  }

  public onDeactivate(event : any) : void {
    this._managerService.releaseManager(event.releaseDate, event.user).subscribe(
      () => {
        this.dataSource.data[event.index].releaseDate = event.releaseDate;
        this.dataSource.data[event.index].admin = false;
      },
      () => this._showErrorDialog("Impossible de notifier la sortie des effectifs.")
    );
  }

  public setAdmin(event : any) : void {
    this._managerService.updateManager(null, null, null, event.admin, event.manager).subscribe(
      () => this.dataSource.data[event.index].admin = event.admin,
      () => this._showErrorDialog("Impossible de mettre à jour les droits administrateur.")
    );
  }

  private _showErrorDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

}
