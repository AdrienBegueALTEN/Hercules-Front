import { CustomerService } from './../../_services/customer.service';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { MissionService } from 'src/app/_services/mission.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
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

  public readonly TITLE_KEY : string = 'title';
  public readonly LOCATION_KEY : string = 'location';
  public readonly CONSULTANT_KEY : string = 'consultant';
  public readonly CUSTOMER_KEY : string = 'customer';

  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;
  @ViewChild(ConsultantAutocompleteComponent) consultant: ConsultantAutocompleteComponent;
  @ViewChild(MissionsCustomerAutocompleteComponent) client: MissionsCustomerAutocompleteComponent;
  @ViewChild(MissionsActivitysectorAutocompleteComponent) activtySector: MissionsActivitysectorAutocompleteComponent;
  @ViewChild(MissionsSkillsAutocompleteComponent) skills: MissionsSkillsAutocompleteComponent;

  public grp : FormGroup = new FormBuilder().group(
    {
      title : '',
      location : ''
    }
  )

  consultants : any[];
  customers : any[];
  missions: any[];
  public showAdvancedSearch : boolean = false;
  public userIsManager : boolean = this._authService.userIsManager();
  public onlyMine : boolean = true;
  public dataSource: MatTableDataSource<any>;
  public userId = this._authService.getUser().id;
  colsToDisp = ['select','title','consultant','customer','sheetStatus'];

  constructor(
    private _missionService: MissionService,
    private _authService: AuthService,
    private _consultantService : ConsultantService,
    private _customerService : CustomerService
  ) {}

  public ngOnInit() : void {
    this._missionService.getMissions(this.userId).subscribe(
      missions => this.missions = missions,
      error => console.log(error)
    )
    this._consultantService.getConsultants(false).subscribe(
      consultants => this.consultants = consultants,
      error => console.log(error)
    )
    this._customerService.getAll().subscribe(
      customers => this.customers = customers,
      error => console.log(error)
    )
  }

  public toggleAdvancedSearch(){
    this.showAdvancedSearch = !this.showAdvancedSearch;
    if(!this.showAdvancedSearch){
      this.setAllMissions();
    }
  }
  

  public setAllMissions(){
    this._missionService.getMissions(this.userId).subscribe(
      (data) => {
        this.missions = data;
        this.arrayView.modifyArray(this.missions);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  public onSearch() : void {
    var criteria : object = {};

    if (this.grp.controls[this.TITLE_KEY].value !== '')
      criteria[this.TITLE_KEY] = this.grp.controls[this.TITLE_KEY].value;

    if (this.grp.controls[this.CUSTOMER_KEY]?.valid)
      criteria[this.CUSTOMER_KEY] = this.grp.controls[this.CUSTOMER_KEY].value.id;

    if (this.grp.controls[this.CONSULTANT_KEY]?.valid)
      criteria[this.CONSULTANT_KEY] = this.grp.controls[this.CONSULTANT_KEY].value.id;

    if (this.grp.controls[this.LOCATION_KEY].value !== '')
      criteria[this.LOCATION_KEY] = this.grp.controls[this.LOCATION_KEY].value;

    if (this.activtySector.getValue() !== "")
      criteria['activitySector'] = this.activtySector.getValue();

    this._missionService.advancedSearch(criteria).subscribe(
      result => {
        this.missions = result;
        this.arrayView.modifyArray(result); 
      },
      error => console.log(error)
    );
  }

  
}
