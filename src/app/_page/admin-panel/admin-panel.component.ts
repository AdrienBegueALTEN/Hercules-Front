import { GRDPService } from './../../_services/GRDPService.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Handles actions in admin panel
 */
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  constructor(
    private _dialog : MatDialog,
    private _snackBar: MatSnackBar,
    private _grdpService : GRDPService
  ) {}

  /**
   * Shows a message to the user, depending on the success of enforcing GRDP
   */
  public onGRDP() : void {
    this._grdpService.applyGRDP().subscribe(
      () => this._snackBar.open('Le RGPD a bien été appliqué.', 'X', {duration: 2000}),
      () => this._showMessageDialog('Impossible d\'appliquer le RGPD.')
    );
  }

  /**
   * Shows the message dialog
   * @param message Message to display to the admin
   */
  private _showMessageDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

}
