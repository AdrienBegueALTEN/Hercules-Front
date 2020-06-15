import { HttpStatus } from './../../_enums/http-status.enum';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/_services/manager.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { NewUserDialogComponent } from 'src/app/_dialog/new-user/new-user-dialog.component';
import { AuthService } from 'src/app/_services/auth.service';
import { isUndefined } from 'util';
import { saveAs } from "file-saver";
import { Router } from '@angular/router';

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
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  public ngOnInit() : void {
    this._managerService.getAll(false).subscribe(
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
              error => { this._handleError("Impossible d'indiquer la sortie des effectifs"); console.log(error); }
            )
            this.ngOnInit()
          },
          error => {
            if (error.status == HttpStatus.CONFLICT) {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = 'Cette adresse mail est indisponible.';
              this._dialog.open(MessageDialogComponent, dialogConfig);
            } else { this._handleError("Erreur de création d'accès"); console.log(error); }
          }
        )
      }
    )
  }

  public goToManagerPage(manager : number) : void {
    this._router.navigateByUrl('managers/' + manager);
  }

  public onDeactivate(event : any) : void {
    this._managerService.updateManager(event.user, 'releaseDate', event.releaseDate)
      .subscribe(() => this.ngOnInit(), error => { this._handleError("Impossible d'indiquer la sortie des effectifs"); console.log(error); });
  }

  public setAdmin(event : any) : void {
    this._managerService.updateManager(event.manager, 'isAdmin', event.admin)
      .subscribe(() => this.ngOnInit(), error => { this._handleError("Impossible de modifier les droits d'administrateurs"); console.log(error); });
  }

  private _handleError(message : string) : void {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }
}
