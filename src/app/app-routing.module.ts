import { NewMissionComponent } from './new-mission/new-mission.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ConsultantDetailsComponent } from './consultants/consultant-details/consultant-details.component';
import { ConsultantCardComponent } from './consultants/consultant-card/consultant-card.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-mission', component: NewMissionComponent },
<<<<<<< HEAD
  { path: 'consultants', component: ConsultantsComponent },
  { path: 'consultants/:id', component: ConsultantDetailsComponent},
=======
  { path: 'consultants', component: ConsultantsComponent},
  { path: 'consultants/:id', component: ConsultantCardComponent},
>>>>>>> parent of 030e4e8... Revert "tri "mes consultants" + ajout formulaire màj consultant ; manque formulaire diplômes"
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
