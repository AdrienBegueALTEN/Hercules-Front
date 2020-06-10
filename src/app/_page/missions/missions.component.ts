import { ConsultantService } from 'src/app/_services/consultant.service';
import { MissionService } from 'src/app/_services/mission.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MissionsActivitysectorAutocompleteComponent } from 'src/app/_input/autocomplete/missions/activitysector/missions-activitysector-autocomplete/missions-activitysector-autocomplete.component';
import { MissionsTitleAutocompleteComponent } from 'src/app/_input/autocomplete/missions/title/missions-title-autocomplete/missions-title-autocomplete.component';
import { MissionsCityAutocompleteComponent } from 'src/app/_input/autocomplete/missions/city/missions-city-autocomplete/missions-city-autocomplete.component';
import { MissionsCountryAutocompleteComponent } from 'src/app/_input/autocomplete/missions/country/missions-country-autocomplete/missions-country-autocomplete.component';
import { ConsultantAutocompleteComponent } from 'src/app/_input/autocomplete/consultant/consultant-autocomplete.component';
import { MissionsCustomerAutocompleteComponent } from 'src/app/_input/autocomplete/missions/customer/missions-customer-autocomplete/missions-customer-autocomplete.component';
import { MissionsSkillsAutocompleteComponent } from 'src/app/_input/autocomplete/missions/missions-skills-autocomplete/missions-skills-autocomplete.component';
import { MatTableDataSource } from '@angular/material/table';



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

  consultants : any[];
  missions: any[];
  public consultantForm : FormControl;
  advancedSearchEnabled = false;
  public userIsManager : boolean = this._authService.userIsManager();
  public onlyMine : boolean = true;
  public dataSource: MatTableDataSource<any>;
  public userId = this._authService.getUser().id;
  colsToDisp = ['select','title','consultant','customer','sheetStatus'];


  constructor(
    private _missionService: MissionService,
    private _authService: AuthService,
    private _consultantService : ConsultantService
  ) { }

  ngOnInit(): void {

    this._missionService.getMissions(this.userId).subscribe(
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
    //test this.arrayView.modifyArray([this.missions[0]]);
  }

  
}
