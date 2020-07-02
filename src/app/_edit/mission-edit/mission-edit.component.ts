import { CtrlError } from 'src/app/_enums/ctrl-error.enum';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const NUMBER_PATTERN = '^\\d*$';

/**
 * Component for the parts that serve to modify a mission
 */
@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.scss']
})
export class MissionEditComponent implements OnInit {
  /**
   * Boolean that indicates if the mission is updated by the consultant with an external link
   */
  @Input() externalVersion : boolean = false;
  /**
   * Object with the details of the version of a mission
   */
  @Input() version : any;

  /**
   * City key used by the application. It's used to know which field is used when getting user input
   */
  readonly CITY_KEY = 'city';
  /**
   * City key to give tips to the user
   */
  readonly CITY_TOOLTIP = 'Ville au sein de laquelle vous avez effectué la mission. En cas de télétravail, ville où se trouve le site du client.';
  /**
   * City key used by the application. It's used to know which field is used when getting user input
   */
  readonly COMMENT_KEY = 'comment';
  /**
   * Sets the maximum length allowed
   */
  readonly COMMENT_MAX_LENGTH = 255;
  /**
   * Contract key used by the application. It's used to know which field is used when getting user input
   */
  readonly CONTRACT_KEY = 'contractType';
  /**
   * Country key used by the application. It's used to know which field is used when getting user input
   */
  readonly COUNTRY_KEY = 'country';
  /**
   * Country key to give tips to the user
   */
  readonly COUNTRY_TOOLTIP = 'Ville au sein duquel vous avez effectué la mission. En cas de télétravail, pays où se trouve le site du client.';
  /**
   * Description key used by the application. It's used to know which field is used when getting user input
   */
  readonly DESCRIPTION_KEY = 'description';
  /**
   * Description key to give tips to the user
   */
  readonly DESCRIPTION_TOOLTIP = 'Descriptif complet présentant la mission dans sa globalité.';
  /**
   * Sets the maximum length for the project description
   */
  readonly DESCRIPTION_MAX_LENGTH = 1000;
  /**
   * Consultant key used by the application. It's used to know which field is used when getting user input
   */
  readonly ROLE_KEY = 'consultantRole';
  /**
   * 
   */
  readonly ROLE_TOOLTIP = 'Titre représentatif des différentes tâches que vous avez été amené à réaliser durant la mission.';
  /**
   * Team size key used by the application. It's used to know which field is used when getting user input
   */
  readonly TEAM_KEY = 'teamSize';
  /**
   * Team key to give tips to the user
   */
  readonly TEAM_TOOLTIP = 'Taille de l\'équipe au sein de laquelle vous avez été amené a travailler durant la mission (vous inclus).';
  /**
   * Title key used by the application. It's used to know which field is used when getting user input
   */
  readonly TITLE_KEY = 'title';
  /**
   * Title key to give tips to the user
   */
  readonly TITLE_TOOLTIP = 'Bref descriptif contenant des mots-clefs représentatifs de la mission.';
  /**
   * Icon key to give tips to the user
   */
  readonly TOOLTIP_ICON = 'help_outline';
/**
 * Sets the position of the tooltip
 */
  readonly TOOLTIP_POS = 'before';
  /**
   * Experience key used by the application. It's used to know which field is used when getting user input
   */
  readonly XP_KEY = 'consultantStartXp';
  /**
   * Experience key to give tips to the user
   */
  readonly XP_TOOLTIP = 'Le nombre d\'années d\'expérience que vous aviez au départ de la mission.';

  /**
   * Form for the mission
   */
  grp : FormGroup;

  /**
   * Event is emitted when user update a mission
   */
  @Output() update : EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.grp = new FormBuilder().group({
      title : [this.version[this.TITLE_KEY], [Validators.required, Validators.maxLength(100)]],
      consultantRole : [this.version[this.ROLE_KEY], [Validators.required, Validators.maxLength(50)]],
      consultantStartXp : [this.version[this.XP_KEY], [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(NUMBER_PATTERN)]],
      description : [this.version[this.DESCRIPTION_KEY], [Validators.required, Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)]],
      city : [this.version[this.CITY_KEY], [Validators.required, Validators.maxLength(100)]],
      country : [this.version[this.COUNTRY_KEY], [Validators.required, Validators.maxLength(100)]],
      teamSize : [this.version[this.TEAM_KEY], [Validators.required, Validators.min(1), Validators.pattern(NUMBER_PATTERN)]],
      contractType : [this.version[this.CONTRACT_KEY], [Validators.required]],
      comment : [this.version[this.COMMENT_KEY], Validators.maxLength(this.COMMENT_MAX_LENGTH)]
    });
  }

  /**
   * Function activated when a field is updated and it sends an http request to update it in the database
   */
  public onChange(key : string) : void {
    if (!this._doUpdate(key)) return;
      const newValue : any = (key === this.TEAM_KEY || key === this.XP_KEY) ? 
      Number(this.grp.controls[key].value) : this.grp.controls[key].value;
      this.update.emit({key : key, value : newValue});
  }

  /**
   * Function that returns a label depending on a given name
   * @returns a label corresponding to the given name
   */
  public getLabelText(key : string) : string {
    switch (key) {
      case this.ROLE_KEY :
        return (this.externalVersion ? 'Votre rôle' : 'Rôle du consultant')
          .concat(' au sein de la mission');
      case this.XP_KEY :
        return (this.externalVersion ? 'Votre niveau d\'expérience' : 'Expérience du consultant')
          .concat(' au début de la mission (en années)');
      default :
        return '';
    }
  }

  /**
   * Function that indicates if a specific field has been updated
   * @param key name of the field
   */
  private _doUpdate(key : string) {
    return this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }

  /**
   * Functions that gives an error text adapted to a given field's name
   * @param key name of field
   * @returns an error linked to the given field's name
   */
  public getErrorTxt(key : string) : string {
    switch (key) {
      case this.CITY_KEY :
        return this.grp.controls[this.CITY_KEY].hasError(CtrlError.REQUIRED) ?
          'La ville doit être renseignée.' : '';
      case this.COUNTRY_KEY :
        return this.grp.controls[this.COUNTRY_KEY].hasError(CtrlError.REQUIRED) ?
          'Le pays doit être renseigné.' : '';
      case this.DESCRIPTION_KEY :
        return this.grp.controls[this.DESCRIPTION_KEY].hasError(CtrlError.REQUIRED) ?
          'La description de la mission est obligatoire.' : '';
      case this.ROLE_KEY :
        return this.grp.controls[this.ROLE_KEY].hasError(CtrlError.REQUIRED) ?
          'Le rôle doit être renseigné.' : '';
      case this.TEAM_KEY :
        return this.grp.controls[this.TEAM_KEY].hasError(CtrlError.REQUIRED) ?
          'La taille de l\'équipe doit être renseignée.' :
          this.grp.controls[this.TEAM_KEY].hasError(CtrlError.MIN) ? 
            'La taille de l\'équipe ne peut pas être strictement inférieure à 1.' : '';
      case this.TITLE_KEY :
        return this.grp.controls[this.TITLE_KEY].hasError(CtrlError.REQUIRED) ?
          'Le titre de la mission doit être renseigné.' : '';
      case this.XP_KEY :
        return this.grp.controls[this.XP_KEY].hasError(CtrlError.REQUIRED) ?
          'Le niveau d\'expérience doit être renseigné.' :
          this.grp.controls[this.XP_KEY].hasError(CtrlError.MIN) ? 
            'Le niveau d\'expérience doit être strictement positif.' : '';
      case this.CONTRACT_KEY :
        return this.grp.controls[this.CONTRACT_KEY].hasError(CtrlError.REQUIRED) ? 'Le type de contrat doit être précisé.' : '' ;
      default :
        return "";
    }
  }
}
