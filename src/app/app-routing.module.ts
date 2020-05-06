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

const routes: Routes = [
  { path: 'login', canActivate: [NoAuthGuard], component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'new-mission', canActivate: [AuthGuard, ManagerGuard], component: NewMissionPageComponent },
  { path: 'missions/:id', canActivate: [AuthGuard], component: MissionPageComponent },
  { path: 'consultants', canActivate: [AuthGuard], component: ConsultantsComponent, runGuardsAndResolvers: 'always' },
  { path: 'consultants/:id', canActivate: [AuthGuard], component: ConsultantPageComponent, runGuardsAndResolvers: 'always' },
  { path: 'customers', canActivate: [AuthGuard], component: CustomersComponent, runGuardsAndResolvers: 'always' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
