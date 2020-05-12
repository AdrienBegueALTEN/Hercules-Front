import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user : any;

  constructor(
    private _authService : AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

  public showNavigationHeader() : boolean {
    console.log(this._router.url)
    return true;
  }

}