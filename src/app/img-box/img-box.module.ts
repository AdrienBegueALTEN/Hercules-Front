import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgBoxComponent } from './img-box.component';
import { SharedModule } from '../shared/shared.module';


/**
 * Module that manages the display of images
 */
@NgModule({
  declarations: [
    ImgBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ImgBoxComponent,
  ]
})
export class ImgBoxModule { }
