import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { SkillTagsComponent } from './skill-tags/skill-tags.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { NewUserComponent } from './new-user/new-user.component';
import { FirstnameInputComponent } from './firstname-input/firstname-input.component';
import { LastnameInputComponent } from './lastname-input/lastname-input.component';
import { EmailInputComponent } from './email-input/email-input.component';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { CustomerInputsModule } from './customer-inputs/customer-inputs.module';



@NgModule({
  declarations: [
    UploadImageComponent,
    SkillTagsComponent,
    NewCustomerComponent,
    NewUserComponent,
    FirstnameInputComponent,
    LastnameInputComponent,
    EmailInputComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AutocompleteModule,
    CustomerInputsModule
  ],
  exports: [
    UploadImageComponent,
    SkillTagsComponent,
    NewCustomerComponent,
    NewUserComponent,
    FirstnameInputComponent,
    LastnameInputComponent,
    EmailInputComponent,
  ]
})
export class InputModule { }
