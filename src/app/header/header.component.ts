import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Role } from '../_enums/role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() user : any;

  userIsAdmin : boolean = false;
  userIsManager : boolean = false;

  constructor(
    private _authService : AuthService
  ) {}

  ngOnInit() {
    this.userIsAdmin = this.user.roles.includes(Role.ADMIN);
    this.userIsManager = this.userIsAdmin || this.user.roles.includes(Role.MANAGER);
  }

  onLogout() { this._authService.logout(); }
}
