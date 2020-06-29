import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantEditComponent } from './consultant-edit/consultant-edit.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { ProjectSingleEditComponent } from './project-single-edit/project-single-edit.component';
import { RecruitmentOfficerEditComponent } from './recruitment-officer-edit/recruitment-officer-edit.component';
import { ManagerEditComponent } from './manager-edit/manager-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ConsultantDiplomaComponent } from './consultant-edit/diploma/diploma-edit.component';
import { ImgBoxModule } from '../img-box/img-box.module';
import { InputModule } from '../_input/input.module';
import { AutocompleteModule } from '../_input/autocomplete/autocomplete.module';
import { CustomerInputsModule } from '../_input/customer-inputs/customer-inputs.module';


/**
 * Module for the components that are used for the modification of elements
 */
@NgModule({
  declarations: [
    ConsultantEditComponent,
    CustomerEditComponent,
    MissionEditComponent,
    ProjectsEditComponent,
    ProjectSingleEditComponent,
    RecruitmentOfficerEditComponent,
    ManagerEditComponent,
    ConsultantDiplomaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImgBoxModule,
    InputModule,
    AutocompleteModule,
    CustomerInputsModule
  ],
  exports: [
    MissionEditComponent,
    ConsultantEditComponent,
    CustomerEditComponent,
    ProjectsEditComponent,
    RecruitmentOfficerEditComponent,
    ManagerEditComponent,
  ]
})
export class EditModule { }
