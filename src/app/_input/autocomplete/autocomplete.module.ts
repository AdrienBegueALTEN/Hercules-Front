import { CustomerChipsComponent } from './customer-chips/customer-chips.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantAutocompleteComponent } from './consultant/consultant-autocomplete.component';
import { CustomerAutocompleteComponent } from './customer/customer-autocomplete.component';
import { ActivitySectorAutocompleteComponent } from './activity-sector/activity-sector-autocomplete.component';
import { SkillsAutocompleteComponent } from './skills/skills-autocomplete.component';
import { ConsultantManagerComponent } from './consultant-manager/consultant-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ConsultantAutocompleteComponent,
    CustomerAutocompleteComponent,
    ActivitySectorAutocompleteComponent,
    SkillsAutocompleteComponent,
    ConsultantManagerComponent,
    CustomerChipsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ConsultantAutocompleteComponent,
    CustomerAutocompleteComponent,
    ActivitySectorAutocompleteComponent,
    SkillsAutocompleteComponent,
    ConsultantManagerComponent,
    CustomerChipsComponent
  ]
})
export class AutocompleteModule { }
