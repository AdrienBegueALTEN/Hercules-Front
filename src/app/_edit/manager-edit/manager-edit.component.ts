import { AuthService } from 'src/app/_services/auth.service';
import { Component, Input } from '@angular/core';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManagerService } from 'src/app/_services/manager.service';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html'
})
export class ManagerEditComponent {
  @Input() manager : any;

  public grp : FormGroup = new FormBuilder().group({});
  
  readonly EMAIL_KEY : string = 'email';
  readonly FIRSTNAME_KEY : string = 'firstname';
  readonly LASTNAME_KEY : string = 'lastname';
  readonly userId : number = this._authService.getUser().id;

  constructor(
    private _authService : AuthService,
    private _managerService : ManagerService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  public valueChange(key : string) : void {
    if (!(this.grp.controls[key].valid && this.grp.controls[key].dirty)) return;
    this._managerService.updateManager(this.manager.id, key, this.grp.controls[key].value).subscribe(
      () => {
        this.manager[key] = this.grp.controls[key].value;
        this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
      },
      error => {this._handleError(error.status); console.log(error); }
    )
  }

  public adminToogle() : void {
    this._managerService.updateManager(this.manager.id, 'isAdmin', !this.manager.admin)
      .subscribe(() => {}, error => {this._handleError(error.status); console.log(error); } );
  }

  private _handleError(status : number) : void {
    let message : string;
    switch(status) {
      case HttpStatus.CONFLICT :
        message = 'Cette adresse mail est indisponible.';
        break;
      default :
        message = 'Impossible de mettre à jour ce champ.';
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = 'Echec de la modification : '+message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }
}