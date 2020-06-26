import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';
import { isUndefined } from 'util';

/**
 * Handles the consultant page data
 */
@Component({
  selector: 'app-consultant-page',
  templateUrl: './consultant-page.component.html',
  styleUrls: ['./consultant-page.component.scss']
})
export class ConsultantPageComponent implements OnInit {
  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;
  /**
   * Consultant object
   */
  consultant : any;
  /**
   * User object
   */
  public user : any = this._authService.getUser();
  /**
   * True : User is manager
   * False : User isn't manager
   */
  public userIsManager : boolean = this._authService.userIsManager();
  /**
   * Contains every mission linked to the consultant
   */
  public consultantsMissions : any[];

  constructor(
    private _authService : AuthService,
    private _consultantService : ConsultantService,
    private _router : Router,
    private _route : ActivatedRoute,
    private _dialogUtils : DialogUtilsService
  ) {}

  ngOnInit() {
    const id : number = this._route.snapshot.params['id'];
    this._consultantService.getConsultant(id).subscribe(
      consultant => {
        this.consultant = consultant;
        this._consultantService.getMissions(consultant.id).subscribe(
          consultantMissions => this.consultantsMissions = consultantMissions),
          error => console.log(error)
      },
      () => this._router.navigate(['/not-found'])
    )
  }

  /**
   * Sets a release date for the consultant
   * If the user can't delete a consultant, returns an error message
   */
  public onSetReleaseDate() : void {
    this._dialogUtils.showDeactivateDialog(this.consultant).afterClosed().subscribe(
      releaseDate => {
        if (!isUndefined(releaseDate)) {
          this._consultantService.updateConsultant(this.consultant.id, 'releaseDate', releaseDate).subscribe(
            () => this.consultant.releaseDate = releaseDate, 
            error => { 
              this._dialogUtils.showMsgDialog("Echec de l'opération."); 
              console.log(error); }
          )
        }
      }); 
  }

  /**
   * Deletes a consultant
   * If the user can't delete a consultant, returns an error message
   */
  public onDelete() : void {
    this._consultantService.deleteConsultant(this.consultant.id).subscribe(
      () => this._router.navigate(['/consultants']),
      error => { 
        this._dialogUtils.showMsgDialog("Echec de la suppression en base.");
        console.log(error);
      }
    )
  }

  /**
   * Updates a consultant
   * If the user can't delete a consultant, returns an error message
   */
  public onManage() : void {
    this._consultantService.updateConsultant(this.consultant.id, 'manager', this.user.id).subscribe(
      () => this.ngOnInit(),
      error => { 
        this._dialogUtils.showMsgDialog("Echec de l'opération.");
        console.log(error);
      }
    )
  }
}
