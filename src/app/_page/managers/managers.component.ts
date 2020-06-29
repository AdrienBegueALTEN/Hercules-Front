import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { HttpStatus } from './../../_enums/http-status.enum';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/_services/manager.service';
import { AuthService } from 'src/app/_services/auth.service';
import { isUndefined } from 'util';
import { saveAs } from "file-saver";
import { Router } from '@angular/router';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html'
})
export class ManagersComponent implements OnInit {
  /**
   * Data source containing the managers
   */
  public dataSource: MatTableDataSource<any>;

  /**
   * This variable is used to make the application knows which dialog box it's supposed to display to the user
   */
  readonly LABEL : string = 'manager';

  constructor(
    private _authService : AuthService,
    private _managerService : ManagerService, 
    private _dialogUtils : DialogUtilsService,
    private _router : Router
  ) {}

  public ngOnInit() : void {
    this._managerService.getAll(false).subscribe(
      (data) => this.dataSource = new MatTableDataSource(data),
      () => window.location.replace("")
    );
  }

  /**
   * Function to create a new manager
   * If the user can't create a new manager, returns an error message to the manager
   */
  public newManager() : void {
    this._dialogUtils.showNewUserDialog(this.LABEL, true).afterClosed().subscribe(
      (user : any) => {
        if (isUndefined(user)) return;
        this._managerService.addManager(user.email, user.firstname, user.lastname, user.isAdmin).subscribe(
          (response) => {
            const userId : number = parseInt(String(response.body));
            this._authService.passwordCreationAccess(userId).subscribe(
              blob => {
                let fileName = user.firstname + '_' + user.lastname + '.eml';
                fileName = fileName.toLowerCase();
                saveAs(blob, fileName);
              },
              () => { this._dialogUtils.showMsgDialog("Impossible d'indiquer la sortie des effectifs"); }
            )
            this.ngOnInit()
          },
          error => {
            if (error.status == HttpStatus.CONFLICT) {
              this._dialogUtils.showMsgDialog('Cette adresse mail est indisponible.');
            } else this._dialogUtils.showMsgDialog("Erreur de création d'accès");
          }
        )
      }
    )
  }

  /**
   * Redirects the user to the manager page
   * @param manager Manager the user clicked on
   */
  public goToManagerPage(manager : number) : void {
    this._router.navigateByUrl('managers/' + manager);
  }

  /**
   * Sets the release date for a manager
   * @param event Event is triggered when the user sets a release date for another user
   */
  public onDeactivate(event : any) : void {
    this._managerService.updateManager(event.user, 'releaseDate', event.releaseDate)
      .subscribe(() => this.ngOnInit(), error => { this._dialogUtils.showMsgDialog("Impossible d'indiquer la sortie des effectifs"); });
  }

  /**
   * Sets another user as admin
   * @param event Event is triggered when an user set another user as admin
   */
  public setAdmin(event : any) : void {
    this._managerService.updateManager(event.manager, 'isAdmin', event.admin)
      .subscribe(() => this.ngOnInit(), error => { this._dialogUtils.showMsgDialog("Impossible de modifier les droits d'administrateurs"); });
  }
}
