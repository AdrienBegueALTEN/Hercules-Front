import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-consultant-view',
  templateUrl: './consultant-view.component.html',
  styleUrls: ['./consultant-view.component.scss']
})
export class ConsultantViewComponent {
  @Input() consultant : any;

  readonly EMAIL_KEY = 'email';
  readonly FIRSTNAME_KEY = 'firstname';
  readonly LASTNAME_KEY = 'lastname';
  readonly RELEASE_DATE_KEY = 'releaseDate';
  readonly XP_KEY = 'experience';

  constructor() { }

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
