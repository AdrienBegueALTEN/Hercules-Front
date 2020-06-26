import { Component, Input } from '@angular/core';

/**
 * Defines the keys and text used in consultant view component 
 */
@Component({
  selector: 'app-consultant-view',
  templateUrl: './consultant-view.component.html',
  styleUrls: ['./consultant-view.component.scss']
})
export class ConsultantViewComponent {
  /**
   * Gets consultant object
   */
  @Input() consultant : any;

  /**
   * Email key
   */
  readonly EMAIL_KEY = 'email';
  /**
   * Firstname key
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
  /**
   * Experience key
   */
  readonly XP_KEY = 'experience';

  constructor() { }

  /**
   * Converts consultant experience into more readable text
   */
  public getXpToText() : string {
    if (!this.consultant[this.XP_KEY]) return "Non renseignée"
    switch (this.consultant[this.XP_KEY]) {
      case 0 :
        return 'Débutant';
      case 1 : 
        return '1 an';
      default :
        return this.consultant[this.XP_KEY] + ' ans';
    }
  }
}
