import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for the main header used for a connected user.
 */
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['../header.scss']
})
export class NavHeaderComponent implements OnInit {

  /**
   * Information of the user
   */
  public user : any;
  /**
   * Boolean that indicates if the user is an admin
   */
  public userIsAdmin : boolean = false;
  /**
   * Boolean that indicates if the user is a manager
   */
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

  /**
   * Function activated when someone clicks on the "change password" option and that opens a dialog window for modifying the password.
   */
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
  /**
   * Function activated when someone clicks on the "log out" option, it clears the session and will lead back the user to the connection screen.
   */
  public onLogout() : void { this._authService.logout(); }
}
