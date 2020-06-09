import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
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
  missions : any[];

  constructor(
    private _authService : AuthService,
    private _consultantService : ConsultantService,
    private _route : ActivatedRoute,
    private _dialog: MatDialog
  ) {
  }
  ngOnInit() {
    const id : number = this._route.snapshot.params['id'];
    this._consultantService.getConsultant(id).subscribe(
      consultant => {
        this.consultant = consultant;
        this._consultantService.getMissions(consultant.id).subscribe(
          (consultantMissions) => this.missions = consultantMissions);
        const user = this._authService.getUser();
        this.writingRights = 
          this._authService.userIsManager()
          && (consultant.manager.id == user.id || consultant.manager.releaseDate != null)
          && consultant.releaseDate == null;
      },
      () => window.location.replace('not-found')
    )
  }

  onSetReleaseDate() : void {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          firstname : this.consultant.firsrname,
          lastname : this.consultant.lastname
        };
    const dialogRef = this._dialog.open(DeactivateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this._consultantService.updateConsultant(this.consultant.id,'releaseDate',data).subscribe(
            () => {
              this.consultant.releaseDate = data;
              this.ngOnInit();
            }, 
            err => {console.log(err)}
          )
        }
      }); 
  }
}
