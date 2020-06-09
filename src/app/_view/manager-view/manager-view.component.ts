import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html'
})
export class ManagerViewComponent {
  @Input() manager : any;

  readonly EMAIL_KEY = 'email';
  readonly FIRSTNAME_KEY = 'firstname';
  readonly LASTNAME_KEY = 'lastname';
  readonly RELEASE_DATE_KEY = 'releaseDate';
}
