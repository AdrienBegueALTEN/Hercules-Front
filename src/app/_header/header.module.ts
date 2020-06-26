import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from './nav/nav-header.component';
import { ExternalHeaderComponent } from './external/external-header.component';
import { SharedModule } from '../shared/shared.module';


/**
 * Module with the components that manages the header in the application
 */
@NgModule({
  declarations: [
    NavHeaderComponent,
    ExternalHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    NavHeaderComponent,
    ExternalHeaderComponent,
  ]
})
export class HeaderModule { }
