import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Role } from '../../_enums/role.enum';

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
    private _authService : AuthService
  ) {}

  ngOnInit() {
    this.user = this._authService.getUser();
    this.userIsAdmin = this._authService.userIsAdmin();
    this.userIsManager = this.userIsAdmin ||  this._authService.userIsManager();
  }

  onLogout() { this._authService.logout(); }
}
