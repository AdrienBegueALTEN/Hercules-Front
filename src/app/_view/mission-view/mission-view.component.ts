import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mission-view',
  templateUrl: './mission-view.component.html',
  styleUrls: ['./mission-view.component.scss']
})
export class MissionViewComponent {
  @Input() mission : any;

  constructor() {}

  public getContractTypeToString() : string {
    switch (this.mission.contractType) {
      case 'flat_fee' :
        return 'Forfait'
      case 'services_center' : 
        return 'Centre De Services'
      case 'technical_assistance' :
        return 'Assistance Technique';
      default :
        return 'Non renseigné'
    }
  }

  public getLocalisationToString() : string {
    return !!this.mission.city ?
      (!!this.mission.country ? 
        this.mission.city + ' (' + this.mission.country + ')' :
        this.mission.city) :
      !!this.mission.country ?
      this.mission.country :
      'Non renseignée';
  }

  public getContractTeamSizeToString() : string {
    return !!this.mission.teamSize ?
      (this.mission.teamSize > 1 ? 
        this.mission.teamSize + ' personnes' :
        'Travail en autonomie') :
      'Non renseignée';
  }
}
