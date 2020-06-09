import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recruitment-officer-view',
  templateUrl: './recruitment-officer-view.component.html'
})
export class RecruitmentOfficerViewComponent {
  @Input() recruitmentOfficer : any;

  readonly EMAIL_KEY = 'email';
  readonly FIRSTNAME_KEY = 'firstname';
  readonly LASTNAME_KEY = 'lastname';
  readonly RELEASE_DATE_KEY = 'releaseDate';

}
