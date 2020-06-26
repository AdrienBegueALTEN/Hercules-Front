import { Component, Input } from '@angular/core';

/**
 * Defines the keys used in manager view component
 */
@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html'
})
export class ManagerViewComponent {
  /**
   * Gets manager object
   */
  @Input() manager : any;

  /**
   * Email key
   */
  readonly EMAIL_KEY = 'email';
  /**
   * First name key
   */
  readonly FIRSTNAME_KEY = 'firstname';
  /**
   * Last name key
   */
  readonly LASTNAME_KEY = 'lastname';
  /**
   * Release date key
   */
  readonly RELEASE_DATE_KEY = 'releaseDate';
}
