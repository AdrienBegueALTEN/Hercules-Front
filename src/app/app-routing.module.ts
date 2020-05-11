import { ManagerGuard } from './_services/guard/manager-guard.service';
import { AuthGuard } from './_services/guard/auth-guard.service';
import { NewMissionPageComponent } from './_page/new-mission/new-mission-page.component';
import { PageNotFoundComponent } from './_page/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantsComponent } from './_page/consultants/consultants.component';
import { NoAuthGuard } from './_services/guard/no-auth-guard.service';
import { MissionPageComponent } from './_page/mission/mission-page.component';
import { ConsultantPageComponent } from './_page/consultant/consultant-page.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './_page/customers/customers.component';
import { CustomerPageComponent } from './_page/customer-page/customer-page.component';
import { MissionSheetPageComponent } from './_page/mission-sheet/mission-sheet-page.component';

const routes: Routes = [
  { 
    path: '', canActivate: [AuthGuard],
    children: [
      { path: 'new-mission', canActivate: [ManagerGuard], component: NewMissionPageComponent },
      { path: 'missions/:id', component: MissionPageComponent },
      { path: 'consultants', component: ConsultantsComponent },
      { path: 'consultants/:id', component: ConsultantPageComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/:id', component: CustomerPageComponent,}
     ],
    component: HomeComponent
  }, 
  { path: 'login', canActivate: [NoAuthGuard], component: LoginComponent },
  { path: 'mission-sheet/:token', component: MissionSheetPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
