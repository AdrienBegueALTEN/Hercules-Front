import { GRDPService } from './../../_services/GRDPService.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from 'src/app/_dialog/change-password/change-password-dialog.component';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['../header.scss']
})
export class NavHeaderComponent implements OnInit {
  user : any;
  userIsAdmin : boolean = false;
  userIsManager : boolean = false;

  constructor(
    private _authService : AuthService,
    private _dialog : MatDialog,
    private _grdpService : GRDPService,
    private _snackBar: MatSnackBar,
  ) {}

  public ngOnInit() {
    this.user = this._authService.getUser();
    this.userIsAdmin = this._authService.userIsAdmin();
    this.userIsManager = this.userIsAdmin || this._authService.userIsManager();
  }

  public onGRDP() : void {
    this._grdpService.applyGRDP().subscribe(
      () => window.location.reload()
    );
  }

  public onChangePassword() : void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.user.id;
    this._dialog.open(ChangePasswordDialogComponent, dialogConfig).afterClosed().subscribe(
      ok => {
        if (!!ok) {
          if (ok) this._snackBar.open('Votre mot de passe a bien été modifié.', 'X', {duration: 2000});
          else this._showMessageDialog('Impossible de modifier le mot de passe.');
        }
      }
    )
  }

  public onLogout() : void { this._authService.logout(); }

  private _showMessageDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }
}
