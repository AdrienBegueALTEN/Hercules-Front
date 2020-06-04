import { GRDPService } from './../../_services/GRDPService.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  public onGRDP() : void {
    this._grdpService.applyGRDP().subscribe(
      () => this._snackBar.open('Le RGPD a bien été appliqué.', 'X', {duration: 2000}),
      () => this._showMessageDialog('Impossible d\'appliquer le RGPD.')
    );
  }

  private _showMessageDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

}
