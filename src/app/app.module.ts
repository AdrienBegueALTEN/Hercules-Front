import { NewCustomerComponent } from './new-mission/new-customer/new-customer.component';
import { NewConsultantComponent } from './new-mission/new-consultant/new-consultant.component';
import { ConsultantAutocompleteComponent } from './new-mission/consultant-autocomplete/consultant-autocomplete.component';
import { CustomerAutocompleteComponent } from './new-mission/customer-autocomplete/customer-autocomplete.component';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

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
import { HometableComponent } from './hometable/hometable.component';
import { ArrayMissionComponent } from './array-mission/array-mission.component';
import { ArrayMissionItemComponent } from './array-mission/array-mission-item/array-mission-item.component';
import { ArrayProjectItemComponent } from './array-mission/array-project-item/array-project-item.component';

import {MissionService} from './_services/mission.service';
import {ProjectService} from './_services/project.service';

import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';


//import { MatPaginatorIntl } from '@angular/material/paginator';
//import { getFrenchPaginatorIntl } from './_services/french-paginator-intl';


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
      PageNotFoundComponent,
      HometableComponent,
      ArrayMissionComponent,
      ArrayMissionItemComponent,
      ArrayProjectItemComponent
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
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatStepperModule,
      FormsModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      MatTableModule,
      MatGridListModule,
      MatCheckboxModule,
      //MatPaginatorIntl,
   ],
   providers: [
      authInterceptorProviders,
      MissionService,
      ProjectService,
      //{  provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() }

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
