import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { DeactivateComponent } from 'src/app/_dialog/deactivate/deactivate.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';

@Component({
  selector: 'app-consultant-page',
  templateUrl: './consultant-page.component.html',
  styleUrls: ['./consultant-page.component.scss']
})
export class ConsultantPageComponent implements OnInit {
  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;
  consultant : any;
  writingRights : boolean = false;
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
          error => console.log(error)
        const user = this._authService.getUser();
        this.writingRights = 
          this._authService.userIsManager()
          && (consultant.manager.id == user.id || consultant.manager.releaseDate != null)
          && consultant.releaseDate == null;
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
            err => {console.log(err)}
          )
        }
      }); 
  }

  public onDelete() : void {
    this._consultantService.deleteConsultant(this.consultant.id).subscribe(
      () => this._router.navigate(['/consultants']),
      error => console.log(error)
    )
  }

  public onCancelReleaseDate() : void {
    this._consultantService.updateConsultant(this.consultant.id,"releaseDate",null).subscribe(
      () => this.consultant.releaseDate = null,
      (error) => console.log(error)
    );
  }
}
