import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameCustInputComponent } from './name-cust-input/name-cust-input.component';
import { ActivitySectorCustInputComponent } from './activity-sector-cust-input/activity-sector-cust-input.component';
import { DescriptionCustInputComponent } from './description-cust-input/description-cust-input.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    NameCustInputComponent,
    ActivitySectorCustInputComponent,
    DescriptionCustInputComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NameCustInputComponent,
    ActivitySectorCustInputComponent,
    DescriptionCustInputComponent,
  ]
})
export class CustomerInputsModule { }
