import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayMissionComponent } from './array-mission.component';
import { ArrayMissionItemComponent } from './array-mission-item/array-mission-item.component';
import { ArrayProjectItemComponent } from './array-project-item/array-project-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ArrayMissionComponent,
    ArrayMissionItemComponent,
    ArrayProjectItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ArrayMissionModule { }
