import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Role } from 'src/app/_enums/role.enum';
import { DeactivateComponent } from 'src/app/dialog/deactivate/deactivate.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consultant-page',
  templateUrl: './consultant-page.component.html',
  styleUrls: ['./consultant-page.component.scss']
})
export class ConsultantPageComponent implements OnInit {
  consultant : any;
  writingRights : boolean = false;
  missions : any[];
  cols: string[] = ['select', 'title', 'consultant', 'customer', 'city', 'manager', 'numberOfProjects', 'sheetStatus'];

  constructor(
    private _authService : AuthService,
    private _consultantService : ConsultantService,
    private _route : ActivatedRoute,
    private _dialog: MatDialog,
  ) {
  }
  ngOnInit() {
    const id : number = this._route.snapshot.params['id'];
    this._consultantService.getConsultant(id).subscribe(
      consultant => {
        this.consultant = consultant;
        this.getMissions();
        const user = this._authService.getUser();
        this.writingRights = 
          user.roles.includes(Role.MANAGER) && consultant.manager.id == user.id
          && consultant.releaseDate==null;
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

  getMissions(){
    this._consultantService.getMissionByConsultant(this.consultant.id).subscribe(
      (data) => {
        this.missions = data;
        console.log(this.missions);
      },
      (err) => {}
    )
  }
}
