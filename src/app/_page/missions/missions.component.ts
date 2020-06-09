import { ConsultantService } from 'src/app/_services/consultant.service';
import { MissionService } from 'src/app/_services/mission.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/_dialog/yes-no/yes-no-dialog.component';
import { FormControl } from '@angular/forms';
import { MissionsActivitysectorAutocompleteComponent } from 'src/app/_input/autocomplete/missions/activitysector/missions-activitysector-autocomplete/missions-activitysector-autocomplete.component';
import { MissionsTitleAutocompleteComponent } from 'src/app/_input/autocomplete/missions/title/missions-title-autocomplete/missions-title-autocomplete.component';
import { MissionsCityAutocompleteComponent } from 'src/app/_input/autocomplete/missions/city/missions-city-autocomplete/missions-city-autocomplete.component';
import { MissionsCountryAutocompleteComponent } from 'src/app/_input/autocomplete/missions/country/missions-country-autocomplete/missions-country-autocomplete.component';
import { ConsultantAutocompleteComponent } from 'src/app/_input/autocomplete/consultant/consultant-autocomplete.component';
import { CustomerAutocompleteComponent } from 'src/app/_input/autocomplete/customer/customer-autocomplete.component';
import { MissionsCustomerAutocompleteComponent } from 'src/app/_input/autocomplete/missions/customer/missions-customer-autocomplete/missions-customer-autocomplete.component';
import { MissionsSkillsAutocompleteComponent } from 'src/app/_input/autocomplete/missions/missions-skills-autocomplete/missions-skills-autocomplete.component';
import { MissionColumnChoiceComponent } from 'src/app/_dialog/mission-column-choice/mission-column-choice.component';



@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {

  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;

  @ViewChild(MissionsTitleAutocompleteComponent) title: MissionsTitleAutocompleteComponent;
  @ViewChild(MissionsCityAutocompleteComponent) city: MissionsCityAutocompleteComponent;
  @ViewChild(MissionsCountryAutocompleteComponent) country: MissionsCountryAutocompleteComponent;
  @ViewChild(ConsultantAutocompleteComponent) consultant: ConsultantAutocompleteComponent;
  @ViewChild(MissionsCustomerAutocompleteComponent) client: MissionsCustomerAutocompleteComponent;
  @ViewChild(MissionsActivitysectorAutocompleteComponent) activtySector: MissionsActivitysectorAutocompleteComponent;
  @ViewChild(MissionsSkillsAutocompleteComponent) skills: MissionsSkillsAutocompleteComponent;

  missions: any[];
  consultants: any[];
  public consultantForm : FormControl;
  advancedSearchEnabled = false;
  cols: any[] = [
    {name:'select',french:'Séléctionner', selected:true},
    {name:'title',french:'Titre', selected:true},
    {name:'consultant',french:'Consultant', selected:true},
    {name:'customer',french:'Client', selected:true},
    {name:'city',french:'Ville', selected:false},
    {name:'manager',french:'Manager', selected:false},
    {name:'numberOfProjects',french:'Nombre de projets', selected:false},
    {name:'sheetStatus',french:'Statut de la fiche', selected:false},
  ];


  constructor(
    private _missionService: MissionService,
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _consultantService : ConsultantService
  ) { }

  ngOnInit(): void {

    const user = this._authService.getUser();

    this._missionService.getMissions(user.id).subscribe(
      (data) => {
        this.missions = data;
      },
      (err) => {
        console.log(err);
      }
    )

    this._consultantService.getConsultants(false).subscribe(
      (consultants) => {
        this.consultants = consultants;
      },
      () => window.location.replace('')
    )


  }
  openDeleteDialog(mission: any): void {
    const dialog = this._dialog.open(YesNoDialogComponent, {
      data: {
        title: 'Supprimer la mission ' + mission.lastVersion.title + ' chez ' + mission.customer.name + '.',
        message: 'Voulez-vous continuer ?',
        yes: 'Supprimer la mission',
        no: 'Annuler'
      },
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.delete(mission);
        }
      }
    );
  }

  delete(mission: any) {
    this._missionService.deleteMission(mission.id).subscribe(
      () => {
        this.missions = this.missions.filter((m) => m.id !== mission.id);
        this.arrayView.createDatasource(this.missions);
      },
      (err) => { }
    )
  }

  advancedSearch(){
    this.advancedSearchEnabled = !this.advancedSearchEnabled;
  }

  getValues(){
    let cons = this.consultant.getValue();
    let lname = null;
    let fname = null;
    if(!(cons instanceof String && typeof cons ==='string')){
      lname = cons.lastname;
      fname = cons.firstname;
    }
    return {
      missionTitle: this.title.getValue(),
      missionCity: this.city.getValue(),
      missionCountry: this.country.getValue(),
      consultantLastName: lname,
      consultantFirstName: fname,
      customerName: this.client.getValue(),
      activitySector: this.activtySector.getValue(),
      skills: this.skills.getSkills()
    };
  }

  sendAdvSearch(){
    const values = this.getValues();
    console.log(values);
  }

  openColsChoice(){
    const dialogRef = this._dialog.open(MissionColumnChoiceComponent, {
      data: {
        cols:this.cols
      }
      
    });
  }
}
