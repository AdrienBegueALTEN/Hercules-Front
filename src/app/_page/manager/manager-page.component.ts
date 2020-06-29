import { DialogUtilsService } from './../../_services/utils/dialog-utils.service';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/_services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { isUndefined } from 'util';

/**
 * Handles the actoins in the manager page
 */
@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {
  /**
   * Contains manager informations
   */
  public manager : any;
  /**
   * Formats the manager information
   */
  public dataSource : MatTableDataSource<any>;
  /**
   * Gets the user ID of the logged in user
   */
  readonly userId : number = this._authService.getUser().id;

  constructor(
    private _authService : AuthService,
    private _managerService : ManagerService,
    private _route: ActivatedRoute,
    private _dialogUtils: DialogUtilsService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    const manager = this._route.snapshot.paramMap.get('id');
    this._managerService.getManagerById(manager).subscribe(
      manager => {
        this.manager = manager;
        this.dataSource = new MatTableDataSource(manager.consultants);
      },
      () => this._router.navigate(['not-found'])
    );
  }

  public onChangePasswordAcces() : void {
    this._authService.passwordCreationAccess(this.manager.id).subscribe(
      blob => {
        let fileName = this.manager.firstname + '_' + this.manager.lastname + '.eml';
        fileName = fileName.toLowerCase();
        saveAs(blob, fileName);
      },
      error => {
        this._dialogUtils.showMsgDialog("Echec de la génération du fichier.");
        console.log(error);
      }
    )
  }

  /**
   * Sets a release date for the manager
   */
  public onSetReleaseDate() : void {
    this._dialogUtils.showDeactivateDialog(this.manager).afterClosed().subscribe(
      releaseDate => {
        if (!isUndefined(releaseDate)) {
          this._managerService.updateManager(this.manager.id, 'releaseDate', releaseDate).subscribe(
            () => this.manager.releaseDate = releaseDate, 
            error => { 
              this._dialogUtils.showMsgDialog("Echec de l'opération."); 
              console.log(error);
            }
          )
        }
      }); 
  }

  /**
   * Deletes the manager from the database
   * If the user can't delete the manager, it will display an error
   */
  public onDelete() : void {
    this._managerService.deleteManager(this.manager.id).subscribe(
      () => this._router.navigate(['/managers']),
      error => {
        this._dialogUtils.showMsgDialog("Echec de la suppression en base.");
        console.log(error);
      }
    )
  }

  /**
   * Redirects the user to the consultant page
   * @param consultant Consultant the user clicked on
   */
  public goToConsultantPage(consultant : number) {
    this._router.navigateByUrl('consultants/' + consultant);
  }
}
