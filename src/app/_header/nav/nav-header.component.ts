import { GRDPService } from './../../_services/GRDPService.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from 'src/app/dialog/change-password/change-password-dialog.component';

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
    private _grdpService : GRDPService
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
    this._dialog.open(ChangePasswordDialogComponent);
  }

  public onLogout() : void { this._authService.logout(); }
}
