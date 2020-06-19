import { AuthService } from './../../_services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class PageNotFoundComponent {
  readonly isAuthentificated : boolean = false;

  constructor(
    authenticationService : AuthService
  ) {
    this.isAuthentificated = authenticationService.isAuthentificated()
  }

}
