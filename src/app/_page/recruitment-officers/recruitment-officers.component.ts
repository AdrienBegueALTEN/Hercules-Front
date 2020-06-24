import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { DatatableComponent } from './../../_view/datatable/datatable.component';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { saveAs } from "file-saver";
import { isUndefined } from 'util';
import { Router } from '@angular/router';

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
    private _dialogUtils : DialogUtilsService,
    private _router : Router) { }

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

  public goToRecruitmentOfficerPage(event : number) : void {
    this._router.navigateByUrl('recruitment-officers/' + event);
  }

  public onDeactivate(event : any) : void {
    this._recruitmentOfficerService.updateRecruitmentOfficer(event.user, 'releaseDate', event.releaseDate).subscribe(
      () => this.ngOnInit(),
      () => this._dialogUtils.showMsgDialog("Impossible d'indiquer la sortie des effectifs")
    );
  }
}
