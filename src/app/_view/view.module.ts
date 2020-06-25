import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantViewComponent } from './consultant-view/consultant-view.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { MissionViewComponent } from './mission-view/mission-view.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import { ProjectSingleViewComponent } from './project-single-view/project-single-view.component';
import { ArrayMissionsViewComponent } from './array-missions-view/array-missions-view.component';
import { RecruitmentOfficerViewComponent } from './recruitment-officer-view/recruitment-officer-view.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { DatatableComponent } from './datatable/datatable.component';
import { SharedModule } from '../shared/shared.module';
import { ImgBoxModule } from '../img-box/img-box.module';



@NgModule({
  declarations: [
    ConsultantViewComponent,
    CustomerViewComponent,
    MissionViewComponent,
    ProjectsViewComponent,
    ProjectSingleViewComponent,
    ArrayMissionsViewComponent,
    RecruitmentOfficerViewComponent,
    ManagerViewComponent,
    DatatableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImgBoxModule
  ],
  exports: [
    ConsultantViewComponent,
    CustomerViewComponent,
    MissionViewComponent,
    ProjectsViewComponent,
    ProjectSingleViewComponent,
    ArrayMissionsViewComponent,
    RecruitmentOfficerViewComponent,
    ManagerViewComponent,
    DatatableComponent,
  ]
})
export class ViewModule { }
