import { CustomerService } from './../../_services/customer.service';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { MissionService } from 'src/app/_services/mission.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivitySectorAutocompleteComponent } from 'src/app/_input/autocomplete/activity-sector/activity-sector-autocomplete.component';
import { SkillsAutocompleteComponent } from 'src/app/_input/autocomplete/skills/skills-autocomplete.component';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Observable } from 'rxjs';

/**
 * This component is the core component of the missions table
 * It gathers everything needed to fill the table and interacts with it
 */
@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {

  /**
   * Title key
   */
  public readonly TITLE_KEY : string = 'title';
  /**
   * Locatin key
   */
  public readonly LOCATION_KEY : string = 'location';
  /**
   * Consultant key
   */
  public readonly CONSULTANT_KEY : string = 'consultant';
  /**
   * Customer key
   */
  public readonly CUSTOMER_KEY : string = 'customer';
  /**
   * Activity sector key
   */
  public readonly ACTIVITY_SECTOR_KEY : string = 'activitySector';
  /**
   * Skills key
   */
  public readonly SKILLS_KEY : string = 'skills';

  /**
   * Gets the view from the child component
   */
  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;
  /**
   * Gets activity sector autocomplete feature from the child component
   */
  @ViewChild(ActivitySectorAutocompleteComponent) activtySector: ActivitySectorAutocompleteComponent;
  /**
   * Gets skills autocomplete feature from the child component
   */
  @ViewChild(SkillsAutocompleteComponent) skills: SkillsAutocompleteComponent;

  eventsSubject: Subject<void> = new Subject<void>();

  public grp : FormGroup = new FormBuilder().group(
    {
      title : '',
      location : ''
    }
  )
/**
 * Consultants array
 * Contains every consultant
 */
  consultants : any[];
  /**
   * Customers array
   * Contains every customer
   */
  customers : any[];
  /**
   * Missions array
   * Contains every mission allowed to be fetched
   */
  missions: any[];
  /**
   * True : Shows advanced search
   * False : Hides advanced search
   */
  public showAdvancedSearch : boolean = false;
  /**
   * True : User is manager
   * False : User isn't manager
   */
  public userIsManager : boolean = this._authService.userIsManager();
  /**
   * True : hides missions not belonging to the user's consultant
   * False : shows every missions
   */
  public onlyMine : boolean = true;
  /**
   * Data source containing missions
   */
  public dataSource : MatTableDataSource<any>;
  /**
   * Contains user ID
   */
  public userId = this._authService.getUser().id;
  /**
   * Default columns to be displayed in the missions table
   */
  colsToDisp = ['select','title','consultant','customer','sheetStatus'];
  /**
   * Cooldown is used to limit the number of requests by the user when he uses advanced search
   * The user can do one request per second.
   * True : Cooldown is enabled. The user can't temporarily use the advanced search
   * False : Cooldown is disabled. The user can use the advanced search
   */
  cooldownOn = false;
  public events: Observable<void> = this.eventsSubject.asObservable();

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

  /**
   * Toggles advanced search
   * When advanced search is enabled, the basic search is disabled and any content inside the basic search is cleared
   */
  public toggleAdvancedSearch(){
    this.showAdvancedSearch = !this.showAdvancedSearch;
    if(!this.showAdvancedSearch){
      this.setAllMissions();
    }
  }
  
  /**
   * Reset table content when advanced search is used
   */
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

  /**
   * Advanced search
   * The function checks which criterion is used.
   * The function will then send the request containing the criteria used by the user
   * It will then get a new missions array matching the criteria
   */
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

    if (this.grp.controls[this.ACTIVITY_SECTOR_KEY]?.value !== '')
      criteria[this.ACTIVITY_SECTOR_KEY] = this.grp.controls[this.ACTIVITY_SECTOR_KEY].value;
    
    if(this.skills.getSkills().length>0)
      criteria[this.SKILLS_KEY] = this.skills.getSkills();

    this._missionService.advancedSearch(criteria).subscribe(
      result => {
        this.missions = result;
        this.arrayView.modifyArray(result); 
      },
      error => console.log(error)
    );
  }

  /**
   * When the function is called, cooldown is true until one second passes
   */
  cooldownTime() {
    this.cooldownOn = true;
    setTimeout(() => this.cooldownOn = false, 1000)
  }

  /**
   * When it's called, emit an event to the child component
   */
  emitEventToChild() {
    this.eventsSubject.next();
  }
}
