import { Component, OnInit} from '@angular/core';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';

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
    private _dialogUtils: DialogUtilsService,
    private _route: ActivatedRoute,
    private _router: Router
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

  public onSetReleaseDate() : void {
    const dialogRef = this._dialogUtils.showDeactivateDialog(this.recruitmentOfficer);
    dialogRef.afterClosed().subscribe(
      releaseDate => {
        if (releaseDate) {
          this._recruitmentOfficerService.updateRecruitmentOfficer(this.recruitmentOfficer.id, 'releaseDate', releaseDate).subscribe(
            () => this.recruitmentOfficer.releaseDate = releaseDate, 
            error => { 
              this._dialogUtils.showMsgDialog("Impossible d'indiquer la sortie des effectifs.");
              console.log(error);
            }
          )
        }
      }); 
  }

  public onDelete() : void {
    this._recruitmentOfficerService.deleteRecruitmentOfficer(this.recruitmentOfficer.id).subscribe(
      () => this._router.navigate(['/recruitment-officers']),
      error => {
        this._dialogUtils.showMsgDialog("Echec de la suppression.");
        console.log(error);
      }
    );
  }
}
 