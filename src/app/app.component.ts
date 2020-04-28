import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Role } from './_enums/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user : any;
  userIsAdmin : boolean = false;
  userIsManager : boolean = false;

  constructor(private _authService : AuthService) { }

  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this.user = this._authService.getUser();
      this.userIsAdmin = this.user.roles.includes(Role.ADMIN);
      this.userIsManager = this.userIsAdmin || this.user.roles.includes(Role.MANAGER);
    }
  }

  onLogout() { this._authService.logout(); }
}