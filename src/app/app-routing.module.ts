import { AdminPanelComponent } from './_page/admin-panel/admin-panel.component';
import { MissionsComponent } from './_page/missions/missions.component';
import { ManagerGuard } from './_services/guard/manager-guard.service';
import { AuthGuard } from './_services/guard/auth-guard.service';
import { NewMissionPageComponent } from './_page/new-mission/new-mission-page.component';
import { PageNotFoundComponent } from './_page/not-found/not-found.component';
import { LoginComponent } from './_page/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantsComponent } from './_page/consultants/consultants.component';
import { NoAuthGuard } from './_services/guard/no-auth-guard.service';
import { MissionPageComponent } from './_page/mission/mission-page.component';
import { ConsultantPageComponent } from './_page/consultant/consultant-page.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './_page/customers/customers.component';
import { CustomerPageComponent } from './_page/customer/customer-page.component';
import { MissionSheetPageComponent } from './_page/mission-sheet/mission-sheet-page.component';
import { RecruitmentOfficerPageComponent } from './_page/recruitment-officer/recruitment-officer-page.component';
import { RecruitmentOfficersComponent } from './_page/recruitment-officers/recruitment-officers.component';
import { AdminGuard } from './_services/guard/admin-guard.service';
import { ManagersComponent } from './_page/managers/managers.component';
import { ManagerPageComponent } from './_page/manager/manager-page.component';

/**
 * Path of the API for the http requests
 */
const routes: Routes = [
  { 
    path: '', canActivate: [AuthGuard],
    children: [
      { path: '', component: MissionsComponent},
      { path: 'new-mission', canActivate: [ManagerGuard], component: NewMissionPageComponent },
      { path: 'missions/:id', component: MissionPageComponent },
      { path: 'consultants', component: ConsultantsComponent },
      { path: 'consultants/:id', component: ConsultantPageComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/:id', component: CustomerPageComponent},
      { path: 'recruitment-officers', canActivate: [AdminGuard], component: RecruitmentOfficersComponent},
      { path: 'recruitment-officers/:id', canActivate: [AdminGuard], component: RecruitmentOfficerPageComponent},
      { path: 'managers', canActivate: [AdminGuard], component: ManagersComponent},
      { path: 'managers/:id', canActivate: [AdminGuard], component: ManagerPageComponent},
      { path: 'admin-panel', canActivate: [AdminGuard], component: AdminPanelComponent}
     ],
    component: HomeComponent
  }, 
  { path: 'login', canActivate: [NoAuthGuard], component: LoginComponent },
  { path: 'login/:token', canActivate: [NoAuthGuard], component: LoginComponent },
  { path: 'mission-sheet/:token', component: MissionSheetPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

/**
 * Module for the paths of the http requests
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
