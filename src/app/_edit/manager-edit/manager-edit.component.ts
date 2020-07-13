import { AuthService } from 'src/app/_services/auth.service';
import { Component, Input } from '@angular/core';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManagerService } from 'src/app/_services/manager.service';

/**
 * Component for the parts that serve to modify a manager
 */
@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html'
})
export class ManagerEditComponent {
  /**
   * Object with the details of the manager
   */
  @Input() manager : any;

  /**
   * Form of the manager
   */
  public grp : FormGroup = new FormBuilder().group({});
  
  /**
   * Email key used when fetching or updating data from API
   */
  readonly EMAIL_KEY : string = 'email';
  /**
   * First name key used when fetching or updating data from API
   */
  readonly FIRSTNAME_KEY : string = 'firstname';
  /**
   * Last name key used when fetching or updating data from API
   */
  readonly LASTNAME_KEY : string = 'lastname';
  /**
   * User ID
   */
  readonly userId : number = this._authService.getUser().id;

  constructor(
    private _authService : AuthService,
    private _managerService : ManagerService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  /**
   * Function activated when a field is updated and it sends an http request to update the field of the manager in the database
   * @param key name of the field
   */
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

  /**
   * Function that changes the administration rights of the manager in the database by sending an http request
   */
  public adminToogle() : void {
    this._managerService.updateManager(this.manager.id, 'isAdmin', !this.manager.admin).subscribe(
        () =>  this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000}),
        error => {this._handleError(error.status); console.log(error); } 
      );
  }

  /**
   * Function that display a window with an error message dpending on a given status
   * @param status Status of an http request
   */
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