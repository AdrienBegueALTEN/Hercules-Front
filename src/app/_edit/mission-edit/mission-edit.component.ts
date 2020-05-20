import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const NUMBER_PATTERN = '^\\d*$';

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html'
})
export class MissionEditComponent implements OnInit {
  @Input() externalVersion : boolean = false;
  @Input() version : any;

  readonly CITY_KEY = 'city';
  readonly CITY_TOOLTIP = 'Ville au sein de laquelle vous avez effectué la mission. En cas de télétravail, ville où se trouve le site du client.';
  readonly COMMENT_KEY = 'comment';
  readonly CONTRACT_KEY = 'contractType';
  readonly COUNTRY_KEY = 'country';
  readonly COUNTRY_TOOLTIP = 'Ville au sein duquel vous avez effectué la mission. En cas de télétravail, pays où se trouve le site du client.';
  readonly DESCRIPTION_KEY = 'description';
  readonly DESCRIPTION_TOOLTIP = 'Descritpif complet présentant la mission dans sa globalité.';
  readonly ROLE_KEY = 'consultantRole';
  readonly ROLE_TOOLTIP = 'Titre représentatif des différentes tâches que vous avez été amené à réaliser durant la mission.';
  readonly TEAM_KEY = 'teamSize';
  readonly TEAM_TOOLTIP = 'Taille de l\'équipe au sein de laquelle vous avez été amené a travailler durant la mission (vous inclus).';
  readonly TITLE_KEY = 'title';
  readonly TITLE_TOOLTIP = 'Bref descriptif contenant des mots-clefs représentatifs de la mission.';
  readonly TOOLTIP_ICON = 'help_outline';
  readonly TOOLTIP_POS = 'before';
  readonly XP_KEY = 'consultantStartXp';
  readonly XP_TOOLTIP = 'Le nombre d\'années d\'expérience que vous aviez au départ de la mission.';

  grp : FormGroup;

  @Output() update : EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.grp = new FormBuilder().group({
      title : [this.version[this.TITLE_KEY], [Validators.maxLength(100)]],
      consultantRole : [this.version[this.ROLE_KEY], [Validators.maxLength(100)]],
      consultantStartXp : [this.version[this.XP_KEY], [Validators.required, Validators.min(0), Validators.pattern(NUMBER_PATTERN)]],
      description : [this.version[this.DESCRIPTION_KEY], [Validators.maxLength(1000)]],
      city : [this.version[this.CITY_KEY], [Validators.maxLength(100)]],
      country : [this.version[this.COUNTRY_KEY], [Validators.maxLength(100)]],
      teamSize : [this.version[this.TEAM_KEY], [Validators.required, Validators.min(1), Validators.pattern(NUMBER_PATTERN)]],
      contractType : [this.version[this.CONTRACT_KEY]],
    });
    if (this.version[this.COMMENT_KEY])
      this.grp.addControl(this.COMMENT_KEY, new FormControl(this.version[this.COMMENT_KEY], [Validators.maxLength(255)]));
  }

  public onChange(key : string) : void {
    if (!this._doUpdate(key)) return;
      const newValue : any = (key === this.TEAM_KEY || key === this.XP_KEY) ? 
      Number(this.grp.controls[key].value) : this.grp.controls[key].value;
      this.update.emit({key : key, value : newValue});
  }

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

  private _doUpdate(key : string) {
    return this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }
}
