import { CdkDetailRowDirective } from './_directive/cdk-detail-row.directive';

import { MissionSheetPageComponent } from './_page/mission-sheet/mission-sheet-page.component';
import { HomeComponent } from './home/home.component';
import { MissionEditComponent } from './_edit/mission-edit/mission-edit.component';
import { MissionViewComponent } from './_view/mission-view/mission-view.component';
import { XpInputComponent } from './_input/xp-input/xp-input.component';
import { ConsultantViewComponent } from './_view/consultant-view/consultant-view.component';
import { EmailInputComponent } from './_input/email-input/email-input.component';
import { LastnameInputComponent } from './_input/lastname-input/lastname-input.component';
import { FirstnameInputComponent } from './_input/firstname-input/firstname-input.component';
import { MessageDialogComponent } from './dialog/message/message-dialog.component';
import { YesNoDialogComponent } from './dialog/yes-no/yes-no-dialog.component';
import { NewCustomerComponent } from './_page/new-mission/new-customer/new-customer.component';
import { NewConsultantComponent } from './_page/new-mission/new-consultant/new-consultant.component';
import { ConsultantAutocompleteComponent } from './_input/autocomplete/consultant/consultant-autocomplete.component';
import { CustomerAutocompleteComponent } from './_input/autocomplete/customer/customer-autocomplete.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

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
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/login//login.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from 'src/app/_helper/auth.interceptor';
import { NewMissionPageComponent } from 'src/app/_page/new-mission/new-mission-page.component';
import { PageNotFoundComponent } from 'src/app/_page/not-found/not-found.component';
import { ConsultantsComponent } from './_page/consultants/consultants.component';
import { DeactivateComponent } from './dialog/deactivate/deactivate.component';
import { MissionPageComponent } from './_page/mission/mission-page.component';
import { ConsultantEditComponent } from './_edit/consultant-edit/consultant-edit.component';
import { CustomerEditComponent } from './_edit/customer-edit/customer-edit.component';
import { CustomerViewComponent } from './_view/customer-view/customer-view.component';
import { ConsultantManagerComponent } from './_input/autocomplete/consultant-manager/consultant-manager.component';
import { ConsultantDiplomaComponent } from './_edit/consultant-edit/diploma/diploma-edit.component';
import { ArrayMissionItemComponent } from './array-mission/array-mission-item/array-mission-item.component';
import { ArrayProjectItemComponent } from './array-mission/array-project-item/array-project-item.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { MissionService } from './_services/mission.service';
import { getFrenchPaginatorIntl } from './_services/french-paginator-intl';
import { ConsultantPageComponent } from './_page/consultant/consultant-page.component';
import { ArrayMissionComponent } from './array-mission/array-mission.component';
import { CustomersComponent } from './_page/customers/customers.component';
import { NavHeaderComponent } from './_header/nav/nav-header.component';
import { CustomerPageComponent } from './_page/customer-page/customer-page.component';
import { NameCustInputComponent } from './_input/customer-inputs/name-cust-input/name-cust-input.component';
import { ActivitySectorCustInputComponent } from './_input/customer-inputs/activity-sector-cust-input/activity-sector-cust-input.component';
import { DescriptionCustInputComponent } from './_input/customer-inputs/description-cust-input/description-cust-input.component';
import { LogoCustInputComponent } from './_input/customer-inputs/logo-cust-input/logo-cust-input.component';
import { ProjectsViewComponent } from "./_view/projects-view/projects-view.component";
import { ProjectSingleViewComponent } from './_view/project-single-view/project-single-view.component';
import { ProjectsEditComponent } from './_edit/projects-edit/projects-edit.component';
import { ProjectSingleEditComponent } from './_edit/project-single-edit/project-single-edit.component';
import { PaginatorProjectsComponent } from './_utils/paginator-projects/paginator-projects.component';
import { ExternalHeaderComponent } from './_header/external/external-header.component';
import { RecruitmentOfficersComponent } from './_page/recruitment-officers/recruitment-officers.component';
import { RecruitmentOfficerPageComponent } from './_page/recruitment-officer-page/recruitment-officer-page.component';
import { NewRecruitmentOfficerComponent } from './_page/new-recruitment-officer/new-recruitment-officer.component';
import { MissionsComponent } from './_page/missions/missions.component';
import { OkDialogComponent } from './dialog/ok/ok-dialog.component';
import { ArrayMissionsViewComponent } from './_view/array-missions-view/array-missions-view.component';



@NgModule({

   declarations: [
      AppComponent,
      ConsultantAutocompleteComponent,
      CustomerAutocompleteComponent,
      LoginComponent,
      NewConsultantComponent,
      NewCustomerComponent,
      NewMissionPageComponent,
      MessageDialogComponent,
      PageNotFoundComponent,
      ConsultantsComponent,
      DeactivateComponent,
      YesNoDialogComponent,
      ConsultantManagerComponent,
      MissionPageComponent,
      ConsultantDiplomaComponent,
      FirstnameInputComponent,
      LastnameInputComponent,
      EmailInputComponent,
      XpInputComponent,
      ConsultantViewComponent,
      ConsultantEditComponent,
      CustomerViewComponent,
      CustomerEditComponent,
      ArrayMissionComponent,
      ArrayMissionItemComponent,
      ArrayProjectItemComponent,
      ConsultantPageComponent,
      CustomersComponent,
      MissionPageComponent,
      MissionViewComponent,
      MissionEditComponent,
      NavHeaderComponent,
      CustomerPageComponent,
      NameCustInputComponent,
      ActivitySectorCustInputComponent,
      DescriptionCustInputComponent,
      LogoCustInputComponent,
      ProjectsViewComponent,
      ProjectSingleViewComponent,
      ProjectsEditComponent,
      ProjectSingleEditComponent,
      PaginatorProjectsComponent,
      HomeComponent,
      MissionSheetPageComponent,
      ExternalHeaderComponent,
      MissionsComponent,
      CdkDetailRowDirective,
      RecruitmentOfficersComponent,
      RecruitmentOfficerPageComponent,
      NewRecruitmentOfficerComponent,
      OkDialogComponent,
      ArrayMissionsViewComponent
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
      MatCheckboxModule,
      MatDividerModule,
      MatSnackBarModule,
      MatButtonToggleModule,
      MatRadioModule,
      MatChipsModule,
      MatSortModule,
      MatExpansionModule,
      CdkTableModule,
      CdkTreeModule,
     
   ],
   providers: [
      authInterceptorProviders,
      MissionService,
      {  provide: MatPaginatorIntl, 
         useValue: getFrenchPaginatorIntl() 
      }
   ],
   

   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      MessageDialogComponent,
      YesNoDialogComponent
   ]
})
export class AppModule { }
