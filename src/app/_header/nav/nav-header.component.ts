import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['../header.scss']
})
export class NavHeaderComponent implements OnInit {
  public user : any;
  public userIsAdmin : boolean = false;
  public userIsManager : boolean = false;

  constructor(
    private _authService : AuthService,
    private _dialogUtils : DialogUtilsService,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.user = this._authService.getUser();
    this.userIsAdmin = this._authService.userIsAdmin();
    this.userIsManager = this.userIsAdmin || this._authService.userIsManager();
  }

  public onChangePassword() : void {
    this._dialogUtils.showChangePasswordDialog(this.user.id).afterClosed().subscribe(
      ok => {
        if (!!ok) {
          if (ok) this._snackBar.open('Votre mot de passe a bien été modifié.', 'X', {duration: 2000});
          else this._dialogUtils.showMsgDialog('Impossible de modifier le mot de passe.');
        }
      }
    )
  }

  public onLogout() : void { this._authService.logout(); }
}
