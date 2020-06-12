import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { DeactivateComponent } from 'src/app/_dialog/deactivate/deactivate.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { HttpStatus } from 'src/app/_enums/http-status.enum';

@Component({
  selector: 'app-consultant-page',
  templateUrl: './consultant-page.component.html',
  styleUrls: ['./consultant-page.component.scss']
})
export class ConsultantPageComponent implements OnInit {
  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;
  consultant : any;
  writingRights : boolean = false;
  writingRights2 : boolean = false;
  consultantsMissions : any[];

  constructor(
    private _authService : AuthService,
    private _consultantService : ConsultantService,
    private _router : Router,
    private _route : ActivatedRoute,
    private _dialog : MatDialog
  ) {}

  ngOnInit() {
    const id : number = this._route.snapshot.params['id'];
    this._consultantService.getConsultant(id).subscribe(
      consultant => {
        this.consultant = consultant;
        this._consultantService.getMissions(consultant.id).subscribe(
          consultantMissions => this.consultantsMissions = consultantMissions),
          error => this._handleError("Impossible d'afficher les missions")
        const user = this._authService.getUser();
        this.writingRights = 
          this._authService.userIsManager()
          && (consultant.manager.id == user.id || consultant.manager.releaseDate != null)
          && consultant.releaseDate == null;
        this.writingRights2 = 
          this._authService.userIsManager()
          && (consultant.manager.id == user.id || consultant.manager.releaseDate != null);
      },
      () => this._router.navigate(['/not-found'])
    )
  }

  public onSetReleaseDate() : void {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          firstname : this.consultant.firsrname,
          lastname : this.consultant.lastname
        };
    const dialogRef = this._dialog.open(DeactivateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      releaseDate => {
        if (releaseDate) {
          this._consultantService.updateConsultant(this.consultant.id, 'releaseDate', releaseDate).subscribe(
            () => this.consultant.releaseDate = releaseDate, 
            error => this._handleError("Impossible d'indiquer la sortie des effectifs")
          )
        }
      }); 
  }

  public onDelete() : void {
    this._consultantService.deleteConsultant(this.consultant.id).subscribe(
      () => this._router.navigate(['/consultants']),
      error => this._handleError("Impossible de supprimer ce consultant")
    )
  }

  public onCancelReleaseDate() : void {
    this._consultantService.updateConsultant(this.consultant.id,"releaseDate",null).subscribe(
      () => this.consultant.releaseDate = null,
      (error) => this._handleError("Impossible de rendre ce consultant actif à nouveau")
    );
  }

  private _handleError(message : string) : void {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }
}
