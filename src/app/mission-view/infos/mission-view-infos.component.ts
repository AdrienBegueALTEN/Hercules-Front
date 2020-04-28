import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mission-view-infos',
  templateUrl: './mission-view-infos.component.html',
  styleUrls: ['./../mission-view.component.scss']
})
export class MissionViewInfosComponent implements OnInit {

  @Input() mission : any;

  constructor() { }

  ngOnInit() {
  }

  public getLocation() : string {
    const city = this.mission.city;
    const country = this.mission.country;
    return city ?
      city + (country ? '(' + country + ')' : '') :
      country ? country : 'Non renseignée';
  }

}
