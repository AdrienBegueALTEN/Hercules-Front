import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';

@Component({
  selector: 'app-recruitment-officer-edit',
  templateUrl: './recruitment-officer-edit.component.html'
})
export class RecruitmentOfficerEditComponent {
  @Input() recruitmentOfficer : any;

  public grp : FormGroup = new FormBuilder().group({});
  
  readonly EMAIL_KEY = 'email';
  readonly FIRSTNAME_KEY = 'firstname';
  readonly LASTNAME_KEY = 'lastname';

  constructor(
    private _recruitmentOfficerService : RecruitmentOfficerService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  valueChange(key : string) : void {
    if (!(this.grp.controls[key].valid && this.grp.controls[key].dirty)) return;
    this._recruitmentOfficerService.updateRecruitmentOfficer(
      this.recruitmentOfficer.id, key, this.grp.controls[key].value).subscribe(
      () => {
        this.recruitmentOfficer[key] = this.grp.controls[key].value;
        this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
      },
      error => { 
        if (error.status == HttpStatus.CONFLICT) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = 'Cette adresse mail est indisponible.';
          this._dialog.open(MessageDialogComponent, dialogConfig);
        } else console.log(error);
      }
    )
  }
}
