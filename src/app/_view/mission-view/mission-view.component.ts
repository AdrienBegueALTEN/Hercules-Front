import { Component, Input } from '@angular/core';

/**
 * Defines how the mission informations are displayed to the user
 */
@Component({
  selector: 'app-mission-view',
  templateUrl: './mission-view.component.html',
  styleUrls: ['./mission-view.component.scss']
})
export class MissionViewComponent {
  /**
   * Contains the missions version
   */
  @Input() version : any;

  constructor() {}


  /**
   * Converts consultant information into something more readable 
   */
  public getConsultantStartXpToText() : string {
    if (!this.version.consultantStartXp) return "Non renseignée"
    switch (this.version.consultantStartXp) {
      case 0 :
        return 'Débutant';
      case 1 : 
        return '1 an';
      default :
        return this.version.consultantStartXp + ' ans';
    }
  }

  /**
   * Converts contract information into something more readable
   */
  public getContractTypeToString() : string {
    switch (this.version.contractType) {
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

  /**
   * Converts country information into something more readable 
   */
  public getLocalisationToString() : string {
    let str : string;
    if (this.version.city) {
      str = this.version.city;
      if (this.version.country)
        str = str.concat(' (', this.version.country , ')');
    } else str = this.version.country || 'Non renseigné';
    return str
  }

  /**
   * Converts contract team size into something more readable 
   */
  public getContractTeamSizeToString() : string {
    if (!this.version.teamSize) return "Non renseignée"
    return this.version.teamSize > 1 ? 
        this.version.teamSize + ' personnes' : 'Travail en autonomie';
  }
}
