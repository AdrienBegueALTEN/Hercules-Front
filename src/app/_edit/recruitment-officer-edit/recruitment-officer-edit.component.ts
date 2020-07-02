import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';

/**
 * Component for the parts that serve to modify a recruitment officer
 */
@Component({
  selector: 'app-recruitment-officer-edit',
  templateUrl: './recruitment-officer-edit.component.html'
})
export class RecruitmentOfficerEditComponent {
  /**
   * Object with the details of a recruitment officer
   */
  @Input() recruitmentOfficer : any;

  /**
   * Form for the recruitment officer
   */
  public grp : FormGroup = new FormBuilder().group({});
  
  /**
   * Email key used by the application. It's used to know which field is used when getting user input
   */
  readonly EMAIL_KEY = 'email';
  /**
   * First name key used by the application. It's used to know which field is used when getting user input
   */
  readonly FIRSTNAME_KEY = 'firstname';
  /**
   * Last name key used by the application. It's used to know which field is used when getting user input
   */
  readonly LASTNAME_KEY = 'lastname';

  constructor(
    private _recruitmentOfficerService : RecruitmentOfficerService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}
  /**
   * Function activated when a field is updated and it sends an http request to modify the recruitment officer in the database then it displays an appropriate message
   * @param key name of the field
   */
  valueChange(key : string) : void {
    if (!(this.grp.controls[key].valid && this.grp.controls[key].dirty)) return;
    this._recruitmentOfficerService.updateRecruitmentOfficer(
      this.recruitmentOfficer.id, key, this.grp.controls[key].value).subscribe(
      () => {
        this.recruitmentOfficer[key] = this.grp.controls[key].value;
        this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
      },
      error => { this._handleError(error.status); console.log(error); }
    )
  }
  /**
   * Function that displays an error message adapted to the given status
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
