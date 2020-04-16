import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user;
  isAuthenticated = false; 
  userIsAdmin = false;
  userIsManager = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = !!this.tokenStorageService.getToken();

    if (this.isAuthenticated) {
      this.user = this.tokenStorageService.getUser();

      this.userIsAdmin = this.user.roles.includes('ADMIN');
      this.userIsManager = this.userIsAdmin || this.user.roles.includes('MANAGER');

    }
  }

  onLogout() {
    this.tokenStorageService.signOut();
    window.location.replace('login');
  }
}