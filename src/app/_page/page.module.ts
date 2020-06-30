import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMissionPageComponent } from './new-mission/new-mission-page.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ConsultantPageComponent } from './consultant/consultant-page.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerPageComponent } from './customer/customer-page.component';
import { MissionPageComponent } from './mission/mission-page.component';
import { MissionSheetPageComponent } from './mission-sheet/mission-sheet-page.component';
import { MissionsComponent } from './missions/missions.component';
import { RecruitmentOfficersComponent } from './recruitment-officers/recruitment-officers.component';
import { RecruitmentOfficerPageComponent } from './recruitment-officer/recruitment-officer-page.component';
import { ManagersComponent } from './managers/managers.component';
import { ManagerPageComponent } from './manager/manager-page.component';
import { EditModule } from '../_edit/edit.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from '../_header/header.module';
import { ViewModule } from '../_view/view.module';
import { InputModule } from '../_input/input.module';
import { LoginComponent } from './login/login.component';
import { AutocompleteModule } from '../_input/autocomplete/autocomplete.module';


/**
 * Module for the component that manages the main apparence of the different pages
 */
@NgModule({
  declarations: [
    NewMissionPageComponent,
    PageNotFoundComponent,
    AdminPanelComponent,
    ConsultantsComponent,
    ConsultantPageComponent,
    CustomersComponent,
    CustomerPageComponent,
    MissionPageComponent,
    MissionSheetPageComponent,
    MissionsComponent,
    RecruitmentOfficersComponent,
    RecruitmentOfficerPageComponent,
    ManagersComponent,
    ManagerPageComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditModule,
    HeaderModule,
    ViewModule,
    InputModule,
    AutocompleteModule
  ]
})
export class PageModule { }
