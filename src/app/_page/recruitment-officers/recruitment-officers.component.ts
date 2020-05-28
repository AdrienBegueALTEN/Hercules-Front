import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, } from '@angular/material/dialog';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { NewUserDialogComponent } from 'src/app/dialog/new-user/new-user-dialog.component';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { saveAs } from "file-saver";
import { isUndefined } from 'util';

@Component({
  selector: 'app-recruitment-officers',
  templateUrl: './recruitment-officers.component.html'
})
export class RecruitmentOfficersComponent implements OnInit {

  public dataSource: MatTableDataSource<any>;

  readonly LABEL : string = 'chargé de recrutement';

  constructor(
    private _authService : AuthService,
    private _recruitmentOfficerService : RecruitmentOfficerService, 
    private _dialog: MatDialog) { }

  public ngOnInit() : void {
    this._recruitmentOfficerService.getRecruitmentOfficers().subscribe(
      (data) => this.dataSource = new MatTableDataSource(data),
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
              () => this._showErrorDialog("Impossible de télécharger le fichier.")
            )
            this.ngOnInit()
          },
          (error) => this._handleError(error)
        )
      }
    )
  }

  public goToRecruitmentOfficerPage(event : number) : void {
    window.location.replace('recruitment-officers/' + event);
  }

  public onDeactivate(event : any) : void {
    this._recruitmentOfficerService.releaseRecruitmentOfficer(event.releaseDate, event.user).subscribe(
      () => this.dataSource.data[event.index].releaseDate = event.releaseDate,
      () => this._showErrorDialog("Impossible de notifier la sortie des effectifs.")
    );
  }

  private _handleError(error : Response) {
    let message : string = "Impossible d'ajouter ce " + this.LABEL + "."
    if (error.status === HttpStatus.CONFLICT)
      message = message.concat(" L'adresse email renseignée est indisponible.");
    this._showErrorDialog(message);
  }

  private _showErrorDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

}
