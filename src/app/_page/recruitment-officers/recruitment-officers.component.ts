import { DatatableComponent } from './../../_view/datatable/datatable.component';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, } from '@angular/material/dialog';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { NewUserDialogComponent } from 'src/app/_dialog/new-user/new-user-dialog.component';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { saveAs } from "file-saver";
import { isUndefined } from 'util';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-recruitment-officers',
  templateUrl: './recruitment-officers.component.html'
})
export class RecruitmentOfficersComponent implements OnInit {
  public dataSource: MatTableDataSource<any>;

  readonly LABEL : string = 'chargé de recrutement';

  @ViewChild(DatatableComponent, { static: true }) datatable : DatatableComponent;

  constructor(
    private _authService : AuthService,
    private _recruitmentOfficerService : RecruitmentOfficerService, 
    private _dialog: MatDialog,
    private _router: Router) { }

  public ngOnInit() : void {
    this.dataSource = new MatTableDataSource();
    this._recruitmentOfficerService.getRecruitmentOfficers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        
      },
      () => window.location.replace("")
    );
  }

  public newRecruitmentOfficer() : void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      label: this.LABEL
    }
    const dialogRef = this._dialog.open(NewUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
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
              error => console.log(error)
            )
            this.ngOnInit();
          },
          error => {
            if (error.status == HttpStatus.CONFLICT) {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = 'Cette adresse mail est indisponible.';
              this._dialog.open(MessageDialogComponent, dialogConfig);
            } else console.log(error);
          }
        );
      }
    )
  }

  public goToRecruitmentOfficerPage(event : number) : void {
    this._router.navigateByUrl('recruitment-officers/' + event);
  }

  public onDeactivate(event : any) : void {
    this._recruitmentOfficerService.updateRecruitmentOfficer(event.user, 'releaseDate', event.releaseDate)
      .subscribe(() => this.ngOnInit(), error => console.log(error));
  }
}
