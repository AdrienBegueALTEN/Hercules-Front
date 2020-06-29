import { AuthService } from './../../_services/auth.service';
import { Component } from '@angular/core';

/**
 * Displays a "not found" page if an unauthorized user tries to access a page he isn't supposed to see
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class PageNotFoundComponent {
  /**
   * Checks if the user has enough privileges to see the page
   */
  readonly isAuthentificated : boolean = false;

  constructor(
    authenticationService : AuthService
  ) {
    this.isAuthentificated = authenticationService.isAuthentificated()
  }

}
