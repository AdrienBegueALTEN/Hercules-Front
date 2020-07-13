import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { saveAs } from "file-saver";
import { isUndefined } from 'util';
import { Router } from '@angular/router';

/**
 * Handles recruitment officer informations
 */
@Component({
  selector: 'app-recruitment-officers',
  templateUrl: './recruitment-officers.component.html'
})
export class RecruitmentOfficersComponent implements OnInit {
  /**
   * Contains formated recruitment officers informations
   */
  public dataSource: MatTableDataSource<any>;

  /**
   * This variable is used to make the application knows which dialog box it's supposed to display to the user
   */
  readonly LABEL : string = 'chargé de recrutement';

 

  constructor(
    private _authService : AuthService,
    private _recruitmentOfficerService : RecruitmentOfficerService, 
    private _dialogUtils : DialogUtilsService,
    private _router : Router) { }

  public ngOnInit() : void {
    this._recruitmentOfficerService.getRecruitmentOfficers().subscribe(
      (data) => this.dataSource = new MatTableDataSource(data),
      () => window.location.replace("")
    );
  }

  /**
   * Open a new dialog box and the required fields to create a new recruitment officer
   */
  public newRecruitmentOfficer() : void {
    this._dialogUtils.showNewUserDialog(this.LABEL).afterClosed().subscribe(
      (user : any) => {
        if (isUndefined(user)) return;
        this._recruitmentOfficerService.addRecruitmentOfficer(user.firstname, user.lastname, user.email).subscribe(
          (response) => {
            const userId : number = parseInt(String(response.body));
            this._authService.passwordCreationAccess(userId).subscribe(
              blob => {
                let fileName = user.firstname + '_' + user.lastname + '.eml';
                fileName = fileName.toLowerCase();
                saveAs(blob, fileName);
              },
              () => this._dialogUtils.showMsgDialog("Impossible d'indiquer la sortie des effectifs")
            )
            this.ngOnInit();
          },
          error => {
            if (error.status == HttpStatus.CONFLICT) {
              this._dialogUtils.showMsgDialog('Cette adresse mail est indisponible.');
            } else this._dialogUtils.showMsgDialog("Erreur de création d'accès");
          }
        );
      }
    )
  }

  /**
   * Redirects the user to the recruitment officer page
   * @param consultant Recruitment officer the user clicked on
   */
  public goToRecruitmentOfficerPage(event : number) : void {
    this._router.navigateByUrl('recruitment-officers/' + event);
  }

  /**
   * Function activated when a recruitment officer is released, it sends an http request to change it in the database and then displays an appropriate message
   * @param event details on the recruitment officer and his given release's date
   */
  public onDeactivate(event : any) : void {
    this._recruitmentOfficerService.updateRecruitmentOfficer(event.user, 'releaseDate', event.releaseDate).subscribe(
      () => this.ngOnInit(),
      () => this._dialogUtils.showMsgDialog("Impossible d'indiquer la sortie des effectifs")
    );
  }
}
