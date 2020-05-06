import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user : any;

  constructor(
    private _authService : AuthService
  ) {}

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

}