import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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


/**
 * Module that contains all the angular modules used in the project 
 */
@NgModule({
  declarations: [
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
