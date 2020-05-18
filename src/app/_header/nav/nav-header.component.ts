import { GRDPService } from './../../_services/GRDPService.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

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
    private _grdpService : GRDPService
  ) {}

  ngOnInit() {
    this.user = this._authService.getUser();
    this.userIsAdmin = this._authService.userIsAdmin();
    this.userIsManager = this.userIsAdmin || this._authService.userIsManager();
  }

  public onLogout() : void { this._authService.logout(); }

  public onGRDP() : void {
    this._grdpService.applyGRDP().subscribe(
      () => window.location.reload()
    );
  }
}
