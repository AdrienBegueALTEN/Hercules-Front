import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from '../_header/header.module';


/**
 * Module for the main structure of a page
 */
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderModule
  ]
})
export class HomeModule { }
