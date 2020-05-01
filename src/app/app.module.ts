import { EmailInputComponent } from './_input/email-input/email-input.component';
import { LastnameInputComponent } from './_input/lastname-input/lastname-input.component';
import { FirstnameInputComponent } from './_input/firstname-input/firstname-input.component';
import { MissionViewConsultantComponent } from './mission-view/consultant/mission-view-consultant.component';
import { MissionViewCustomerComponent } from './mission-view/customer/mission-view-customer.component';
import { MissionViewProjectsComponent } from './mission-view/projects/mission-view-projects.component';
import { OkDialogComponent } from './dialog/ok/ok-dialog.component';
import { YesNoDialogComponent } from './dialog/yes-no/yes-no-dialog.component';
import { NewCustomerComponent } from './new-mission/new-customer/new-customer.component';
import { NewConsultantComponent } from './new-mission/new-consultant/new-consultant.component';
import { ConsultantAutocompleteComponent } from './_input/consultant-autocomplete/consultant-autocomplete.component';
import { CustomerAutocompleteComponent } from './_input/customer-autocomplete/customer-autocomplete.component';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/login//login.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from 'src/app/_helper/auth.interceptor';
import { HomeComponent } from 'src/app/home/home.component';
import { NewMissionComponent } from 'src/app/new-mission/new-mission.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ConsultantDetailsComponent } from './consultants/consultant-details/consultant-details.component';
import { DeactivateComponent } from './consultants/deactivate/deactivate.component';
import { ConsultantCardComponent } from './consultants/consultant-card/consultant-card.component';
import { ConsultantFormComponent } from './consultants/consultant-form/consultant-form.component';
import { ConsultantManagerComponent } from './consultants/consultant-manager/consultant-manager.component';
import { MissionViewComponent } from './mission-view/mission-view.component';
import { MissionViewInfosComponent } from './mission-view/infos/mission-view-infos.component';
import { ConsultantDiplomaComponent } from './consultants/consultant-diploma/consultant-diploma.component';
import { ArrayMissionComponent } from './array-mission/array-mission.component';
import { ArrayMissionItemComponent } from './array-mission/array-mission-item/array-mission-item.component';
import { ArrayProjectItemComponent } from './array-mission/array-project-item/array-project-item.component';

import {MissionService} from './_services/mission.service';
import {ProjectService} from './_services/project.service';
import { getFrenchPaginatorIntl } from './_services/french-paginator-intl';
import { ConsultantNewDiplomaComponent } from './consultants/consultant-new-diploma/consultant-new-diploma.component';
import { InputComponent } from './consultants/input/input.component';

@NgModule({
   declarations: [
      AppComponent,
      ConsultantAutocompleteComponent,
      CustomerAutocompleteComponent,
      HomeComponent,
      LoginComponent,
      NewConsultantComponent,
      NewCustomerComponent,
      NewMissionComponent,
      OkDialogComponent,
      PageNotFoundComponent,
      ConsultantsComponent,
      ConsultantDetailsComponent,
      DeactivateComponent,
      YesNoDialogComponent,
      ConsultantCardComponent,
      ConsultantFormComponent,
      ConsultantManagerComponent,
      MissionViewComponent,
      MissionViewInfosComponent,
      MissionViewProjectsComponent,
      MissionViewConsultantComponent,
      MissionViewCustomerComponent,
      ConsultantDiplomaComponent,
      FirstnameInputComponent,
      LastnameInputComponent,
      EmailInputComponent,
      ArrayMissionComponent,
      ArrayMissionItemComponent,
      ArrayProjectItemComponent,
      ConsultantNewDiplomaComponent,
      InputComponent,
      
   ],
   imports: [
      AppRoutingModule,
      BrowserModule,
      BrowserAnimationsModule,
      CdkStepperModule,
      HttpClientModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatStepperModule,
      FormsModule,
      ReactiveFormsModule,
      MatTableModule,
      MatPaginatorModule,
      MatTooltipModule,
      MatBottomSheetModule,
      MatTabsModule,
      MatSlideToggleModule,
      MatListModule,
      MatGridListModule,
      MatCheckboxModule
   ],
   providers: [
      authInterceptorProviders,
      MissionService,
      ProjectService,
      {  provide: MatPaginatorIntl, 
         useValue: getFrenchPaginatorIntl() 
      }
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      YesNoDialogComponent
   ]
})
export class AppModule { }
