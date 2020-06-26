import { Component, Input } from '@angular/core';

/**
 * Defines the keys used in recruitement officer component
 */
@Component({
  selector: 'app-recruitment-officer-view',
  templateUrl: './recruitment-officer-view.component.html'
})
export class RecruitmentOfficerViewComponent {
  /**
   * Gets the recruitement officer object
   */
  @Input() recruitmentOfficer : any;

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
   * Last name key
   */
  readonly RELEASE_DATE_KEY = 'releaseDate';
}
