import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsAutocompleteComponent } from '../_input/autocomplete/skills/skills-autocomplete.component';
import { ConsultantAutocompleteComponent } from '../_input/autocomplete/consultant/consultant-autocomplete.component';
import { CustomerAutocompleteComponent } from '../_input/autocomplete/customer/customer-autocomplete.component';
import { LoginComponent } from '../_page/login/login.component';
import { NewUserComponent } from '../_input/new-user/new-user.component';
import { NewCustomerComponent } from '../_input/new-customer/new-customer.component';
import { ConsultantManagerComponent } from '../_input/autocomplete/consultant-manager/consultant-manager.component';
import { FirstnameInputComponent } from '../_input/firstname-input/firstname-input.component';
import { LastnameInputComponent } from '../_input/lastname-input/lastname-input.component';
import { EmailInputComponent } from '../_input/email-input/email-input.component';
import { ConsultantViewComponent } from '../_view/consultant-view/consultant-view.component';
import { CustomerViewComponent } from '../_view/customer-view/customer-view.component';
import { ArrayMissionComponent } from '../array-mission/array-mission.component';
import { ArrayMissionItemComponent } from '../array-mission/array-mission-item/array-mission-item.component';
import { ArrayProjectItemComponent } from '../array-mission/array-project-item/array-project-item.component';
import { MissionViewComponent } from '../_view/mission-view/mission-view.component';
import { NavHeaderComponent } from '../_header/nav/nav-header.component';
import { NameCustInputComponent } from '../_input/customer-inputs/name-cust-input/name-cust-input.component';
import { ActivitySectorCustInputComponent } from '../_input/customer-inputs/activity-sector-cust-input/activity-sector-cust-input.component';
import { DescriptionCustInputComponent } from '../_input/customer-inputs/description-cust-input/description-cust-input.component';
import { ProjectsViewComponent } from '../_view/projects-view/projects-view.component';
import { ProjectSingleViewComponent } from '../_view/project-single-view/project-single-view.component';
import { HomeComponent } from '../home/home.component';
import { ExternalHeaderComponent } from '../_header/external/external-header.component';
import { ArrayMissionsViewComponent } from '../_view/array-missions-view/array-missions-view.component';
import { DatatableComponent } from '../_view/datatable/datatable.component';
import { SkillTagsComponent } from '../_input/skill-tags/skill-tags.component';
import { ActivitySectorAutocompleteComponent } from '../_input/autocomplete/activity-sector/activity-sector-autocomplete.component';
import { UploadImageComponent } from '../_input/upload-image/upload-image.component';
import { RecruitmentOfficerViewComponent } from '../_view/recruitment-officer-view/recruitment-officer-view.component';
import { ManagerViewComponent } from '../_view/manager-view/manager-view.component';
import { ImgBoxComponent } from '../img-box/img-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from '../app-routing.module';
import { CdkDetailRowDirective } from '../_directive/cdk-detail-row.directive';



@NgModule({
  declarations: [
    ConsultantAutocompleteComponent,
    CustomerAutocompleteComponent,
    LoginComponent,
    NewCustomerComponent,
    NewUserComponent,
    ConsultantManagerComponent,
    FirstnameInputComponent,
    LastnameInputComponent,
    EmailInputComponent,
    ConsultantViewComponent,
    CustomerViewComponent,
    ArrayMissionComponent,
    ArrayMissionItemComponent,
    ArrayProjectItemComponent,
    MissionViewComponent,
    NavHeaderComponent,
    NameCustInputComponent,
    ActivitySectorCustInputComponent,
    DescriptionCustInputComponent,
    ProjectsViewComponent,
    ProjectSingleViewComponent,
    HomeComponent,
    ExternalHeaderComponent,
    ArrayMissionsViewComponent,
    DatatableComponent,
    SkillTagsComponent,
    ActivitySectorAutocompleteComponent,
    UploadImageComponent,
    RecruitmentOfficerViewComponent,
    ManagerViewComponent,
    SkillsAutocompleteComponent,
    ImgBoxComponent,
    CdkDetailRowDirective,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
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
    MatMenuModule,
    MatBadgeModule,
    DragDropModule,
  ],
  exports: [
    CdkDetailRowDirective,
    ConsultantAutocompleteComponent,
    CustomerAutocompleteComponent,
    LoginComponent,
    NewUserComponent,
    NewCustomerComponent,
    ConsultantManagerComponent,
    FirstnameInputComponent,
    LastnameInputComponent,
    EmailInputComponent,
    ConsultantViewComponent,
    CustomerViewComponent,
    ArrayMissionComponent,
    ArrayMissionItemComponent,
    ArrayProjectItemComponent,
    MissionViewComponent,
    NavHeaderComponent,
    NameCustInputComponent,
    ActivitySectorCustInputComponent,
    DescriptionCustInputComponent,
    ProjectsViewComponent,
    ProjectSingleViewComponent,
    HomeComponent,
    ExternalHeaderComponent,
    ArrayMissionsViewComponent,
    DatatableComponent,
    SkillTagsComponent,
    ActivitySectorAutocompleteComponent,
    UploadImageComponent,
    RecruitmentOfficerViewComponent,
    ManagerViewComponent,
    SkillsAutocompleteComponent,
    ImgBoxComponent,
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
    MatMenuModule,
    MatBadgeModule,
    DragDropModule,
    AppRoutingModule
  ]

})
export class SharedModule { }
