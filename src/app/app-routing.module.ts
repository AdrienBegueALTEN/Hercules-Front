import { ManagerGuard } from './_services/guard/manager-guard.service';
import { AuthGuard } from './_services/guard/auth-guard.service';
import { NewMissionComponent } from './new-mission/new-mission.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ConsultantCardComponent } from './consultants/consultant-card/consultant-card.component';
import { NoAuthGuard } from './_services/guard/no-auth-guard.service';
import { MissionViewComponent } from './mission-view/mission-view.component';

const routes: Routes = [
  { path: 'login', canActivate: [NoAuthGuard], component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-mission', canActivate: [AuthGuard, ManagerGuard], component: NewMissionComponent },
  { path: 'missions/:id', canActivate: [AuthGuard], component: MissionViewComponent },
  { path: 'consultants', canActivate: [AuthGuard], component: ConsultantsComponent},
  { path: 'consultants/:id', canActivate: [AuthGuard], component: ConsultantCardComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
