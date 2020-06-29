import { YesNoDialogComponent } from 'src/app/_dialog/yes-no/yes-no-dialog.component';
import { NewUserDialogComponent } from 'src/app/_dialog/new-user/new-user-dialog.component';
import { ChangePasswordDialogComponent } from 'src/app/_dialog/change-password/change-password-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { DeactivateComponent } from 'src/app/_dialog/deactivate/deactivate.component';

/**
 * Contents of the dialog box displayed to the user
 */
@Injectable({
  providedIn: 'root'
})
export class DialogUtilsService {

constructor(private _dialog : MatDialog) { }

/**
 * Shows a dialog box to the user
 * @param message Text of the dialog box
 */
  public showMsgDialog(message : string) : MatDialogRef<MessageDialogComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.data = message;
    return this._dialog.open(MessageDialogComponent, dialogConfig);
  }

  /**
   * Shows the deactivate dialog box to the user
   * @param user User to deactivate
   */
  public showDeactivateDialog(user : any) : MatDialogRef<DeactivateComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      firstname : user.firstname,
      lastname : user.lastname,
      releaseDate : user.releaseDate
    };
    return this._dialog.open(DeactivateComponent, dialogConfig);
  }

  /**
   * Shows the change password dialog to the user
   * @param user User involved in the password change
   */
  public showChangePasswordDialog(user? : number) : MatDialogRef<ChangePasswordDialogComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    if (!!user) {
      dialogConfig.data = user;
      dialogConfig.disableClose = false;
    } else dialogConfig.disableClose = true;
    return this._dialog.open(ChangePasswordDialogComponent, dialogConfig);
  }

/**
 * Shows new user dialog box if manager doesn't exist
 * @param label Label to search into the dialog box
 * @param newManager True : The manager is new and dooesn't exust yet. False : The manager already exists
 */
  public showNewUserDialog(label : string, newManager : boolean = false) : MatDialogRef<NewUserDialogComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      label : label,
      newManager : newManager
    };
    return this._dialog.open(NewUserDialogComponent, dialogConfig);
  }

  /**
   * 
   * @param title Text to display to the user when dialog box opens
   * @param msg Text to display if user clicks "yes"
   * @param yes Replaces the text inside the "yes" button
   * @param no Replaces the text inside the "no" button
   */
  public showYesNoDialog(title : string, msg : string, yes : string, no : string) : MatDialogRef<YesNoDialogComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title : title,
      message : msg,
      yes: yes,
      no: no
    };
    return this._dialog.open(YesNoDialogComponent, dialogConfig);
  }
}
