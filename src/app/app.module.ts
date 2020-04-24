import { NewCustomerComponent } from './new-mission/new-customer/new-customer.component';
import { NewConsultantComponent } from './new-mission/new-consultant/new-consultant.component';
import { ConsultantAutocompleteComponent } from './new-mission/consultant-autocomplete/consultant-autocomplete.component';
import { CustomerAutocompleteComponent } from './new-mission/customer-autocomplete/customer-autocomplete.component';
import { CdkStepperModule, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

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
      PageNotFoundComponent
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
      MatSnackBarModule,
      MatStepperModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      authInterceptorProviders,
      {
         provide: STEPPER_GLOBAL_OPTIONS,
         useValue: { displayDefaultIndicatorType: false }
      },
      {
         provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
         useValue: { duration: 7000 }
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
