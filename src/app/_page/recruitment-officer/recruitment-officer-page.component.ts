import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OkDialogComponent } from 'src/app/_dialog/ok/ok-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YesNoDialogComponent } from 'src/app/_dialog/yes-no/yes-no-dialog.component';
import { DeactivateComponent } from 'src/app/_dialog/deactivate/deactivate.component';
import { HttpStatus } from 'src/app/_enums/http-status.enum';

@Component({
  selector: 'app-recruitment-officer-page',
  templateUrl: './recruitment-officer-page.component.html',
  styleUrls: ['./recruitment-officer-page.component.scss']
})
export class RecruitmentOfficerPageComponent implements OnInit {
  public recruitmentOfficer : any;

  constructor(
    private _recruitmentOfficerService : RecruitmentOfficerService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    const recruitmentOfficer = this._route.snapshot.paramMap.get('id');
    this._recruitmentOfficerService.getRecruitmentOfficerById(recruitmentOfficer).subscribe(
      recruitmentOfficer => this.recruitmentOfficer = recruitmentOfficer,
      () => this._router.navigate(['not-found'])
    );
  }

  public onSetReleaseDate() : void {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          firstname : this.recruitmentOfficer.firsrname,
          lastname : this.recruitmentOfficer.lastname
        };
    const dialogRef = this._dialog.open(DeactivateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      releaseDate => {
        if (releaseDate) {
          this._recruitmentOfficerService.updateRecruitmentOfficer(this.recruitmentOfficer.id, 'releaseDate', releaseDate).subscribe(
            () => this.recruitmentOfficer.releaseDate = releaseDate, 
            error => console.log(error)
          )
        }
      }); 
  }

  public onDelete() : void {
    this._recruitmentOfficerService.deleteRecruitmentOfficer(this.recruitmentOfficer.id).subscribe(
      () => this._router.navigate(['/recruitment-officers']),
      error => console.log(error)
    )
  }

}
 