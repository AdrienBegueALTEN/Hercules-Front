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
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditModule
  ]
})
export class PageModule { }
