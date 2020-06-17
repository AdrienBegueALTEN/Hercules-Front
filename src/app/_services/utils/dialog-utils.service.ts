import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { DeactivateComponent } from 'src/app/_dialog/deactivate/deactivate.component';

@Injectable({
  providedIn: 'root'
})
export class DialogUtilsService {

constructor(private _dialog : MatDialog) { }

  public showMsgDialog(message : string) : MatDialogRef<MessageDialogComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.data = message;
    return this._dialog.open(MessageDialogComponent, dialogConfig);
  }

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

}
