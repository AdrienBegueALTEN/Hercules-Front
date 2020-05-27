import { FormGroup } from '@angular/forms';
import { NewUserComponent } from './../../_input/new-user/new-user.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { NewUserDialogComponent } from 'src/app/dialog/new-user/new-user-dialog.component';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';

@Component({
  selector: 'app-recruitment-officers',
  templateUrl: './recruitment-officers.component.html'
})
export class RecruitmentOfficersComponent implements OnInit {

  public dataSource: MatTableDataSource<any>;
  public columnsToDisplay = ['firstname', 'lastname', 'email'];

  constructor(
    private _recruitmentOfficerService: RecruitmentOfficerService, 
    private _dialog: MatDialog) { }

  public ngOnInit() : void {
    this._recruitmentOfficerService.getRecruitmentOfficers().subscribe(
      (data) => this.dataSource = new MatTableDataSource(data),
      () => window.location.replace("")
    );
  }

  public newRecruitmentOfficer() : void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = 'chargé de recrutement'
    const dialogRef = this._dialog.open(NewUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (userFormGrp : FormGroup) => {
        if (userFormGrp?.valid) {
          this._recruitmentOfficerService.addRecruitmentOfficer(
            userFormGrp.controls['firstname'].value,
            userFormGrp.controls['lastname'].value,
            userFormGrp.controls['email'].value,
          ).subscribe(
            () => this.ngOnInit(),
            (err) => console.log(err)
          ) 
        }
      }
    )
  }

  public goToRecruitmentOfficerPage(event : number) : void {
    window.location.replace('recruitment-officers/' + event)
  }

  private _showErrorDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

}
