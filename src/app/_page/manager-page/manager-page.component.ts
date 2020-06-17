import { DialogUtilsService } from './../../_services/utils/dialog-utils.service';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/_services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {
  public manager : any;
  public dataSource : MatTableDataSource<any>;
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

  public onSetReleaseDate() : void {
    const dialogRef = this._dialogUtils.showDeactivateDialog(this.manager);
    dialogRef.afterClosed().subscribe(
      releaseDate => {
        if (releaseDate) {
          this._managerService.updateManager(this.manager.id, 'releaseDate', releaseDate).subscribe(
            () => this.manager.releaseDate = releaseDate, 
            error => { 
              this._dialogUtils.showMsgDialog("Impossible d'indiquer la sortie des effectifs.");
              console.log(error);
            }
          )
        }
      }); 
  }

  public onDelete() : void {
    this._managerService.deleteManager(this.manager.id).subscribe(
      () => this._router.navigate(['/managers']),
      error => {
        this._dialogUtils.showMsgDialog("Echec de la suppression.");
        console.log(error);
      }
    )
  }

  public goToConsultantPage(consultant : number) {
    this._router.navigateByUrl('consultants/' + consultant);
  }
}
