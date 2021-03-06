import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from './message/message-dialog.component';
import { DeactivateComponent } from './deactivate/deactivate.component';
import { YesNoDialogComponent } from './yes-no/yes-no-dialog.component';
import { ChooseFilenameDialogComponent } from './choose-filename-dialog/choose-filename-dialog.component';
import { MissionColumnChoiceComponent } from './mission-column-choice/mission-column-choice.component';
import { NewUserDialogComponent } from './new-user/new-user-dialog.component';
import { ChangePasswordDialogComponent } from './change-password/change-password-dialog.component';
import { OkDialogComponent } from './ok/ok-dialog.component';
import { NewCustomerDialogComponent } from './new-customer/new-customer-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { InputModule } from '../_input/input.module';


/**
 * Module for the components that manages the dialog windows.
 */
@NgModule({
  declarations: [
    MessageDialogComponent,
    DeactivateComponent,
    YesNoDialogComponent,
    ChooseFilenameDialogComponent,
    MissionColumnChoiceComponent,
    NewUserDialogComponent,
    ChangePasswordDialogComponent,
    OkDialogComponent,
    NewCustomerDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputModule
  ]
})
export class DialogModule { }
