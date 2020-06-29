import { DateUtilsService } from './../../_services/utils/dateUtils.service';
import { Component, OnInit} from '@angular/core';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-recruitment-officer-page',
  templateUrl: './recruitment-officer-page.component.html',
  styleUrls: ['./recruitment-officer-page.component.scss']
})
export class RecruitmentOfficerPageComponent implements OnInit {
  public recruitmentOfficer : any;

  constructor(
    private _authService : AuthService,
    private _recruitmentOfficerService : RecruitmentOfficerService,
    private _dialogUtils : DialogUtilsService,
    private _route : ActivatedRoute,
    private _router : Router,
    private _dateUtils : DateUtilsService
  ) {}

  public ngOnInit(): void {
    const recruitmentOfficer = this._route.snapshot.paramMap.get('id');
    this._recruitmentOfficerService.getRecruitmentOfficerById(recruitmentOfficer).subscribe(
      recruitmentOfficer => this.recruitmentOfficer = recruitmentOfficer,
      () => this._router.navigate(['not-found'])
    );
  }

  public onChangePasswordAcces() : void {
    this._authService.passwordCreationAccess(this.recruitmentOfficer.id).subscribe(
      blob => {
        let fileName = this.recruitmentOfficer.firstname + '_' + this.recruitmentOfficer.lastname + '.eml';
        fileName = fileName.toLowerCase();
        saveAs(blob, fileName);
      },
      error => {
        this._dialogUtils.showMsgDialog("Echec de la génération du fichier.");
        console.log(error);
      }
    )
  }

  /**
   * Sets a release date for a recruitment officer
   * If the date can't be set, returns an error message to the user
   */
  public onSetReleaseDate() : void {
    this._dialogUtils.showDeactivateDialog(this.recruitmentOfficer).afterClosed().subscribe(
      releaseDate => {
        if (!isUndefined(releaseDate)) {
          this._recruitmentOfficerService.updateRecruitmentOfficer(this.recruitmentOfficer.id, 'releaseDate', releaseDate).subscribe(
            () => this.recruitmentOfficer.releaseDate = releaseDate, 
            error => { 
              this._dialogUtils.showMsgDialog("Echec de l'opération."); 
              console.log(error);
            }
          )
        }
      }); 
  }

  /**
   * Deletes the chosen recruitment officer
   * If he can't be deleted, returns an error message to the user
   */
  public onDelete() : void {
    this._recruitmentOfficerService.deleteRecruitmentOfficer(this.recruitmentOfficer.id).subscribe(
      () => this._router.navigate(['/recruitment-officers']),
      error => {
        this._dialogUtils.showMsgDialog("Echec de la suppression en base.");
        console.log(error);
      }
    );
  }

  public isActive() : boolean {
    return this._dateUtils.userIsActive(this.recruitmentOfficer);
  }
}
 