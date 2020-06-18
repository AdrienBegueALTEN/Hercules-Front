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
  public readonly ACTIVITY_SECTOR_KEY : string = 'activitySector';
  public readonly SKILLS_KEY : string = 'skills';

  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;
  @ViewChild(ActivitySectorAutocompleteComponent) activtySector: ActivitySectorAutocompleteComponent;
  @ViewChild(SkillsAutocompleteComponent) skills: SkillsAutocompleteComponent;

  eventsSubject: Subject<void> = new Subject<void>();

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
  public dataSource : MatTableDataSource<any>;
  public userId = this._authService.getUser().id;
  colsToDisp = ['select','title','consultant','customer','sheetStatus'];
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

  cooldownTime() {
    this.cooldownOn = true;
    setTimeout(() => this.cooldownOn = false, 1000)
  }

  emitEventToChild() {
    this.eventsSubject.next();
  }
}
