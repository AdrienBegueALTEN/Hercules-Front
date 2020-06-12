import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/_services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeactivateComponent } from 'src/app/_dialog/deactivate/deactivate.component';
import { AuthService } from 'src/app/_services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';

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
    private _dialog: MatDialog,
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

  public onSetReleaseDate() : void {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          firstname : this.manager.firstname,
          lastname : this.manager.lastname
        };
    const dialogRef = this._dialog.open(DeactivateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      releaseDate => {
        if (releaseDate) {
          this._managerService.updateManager(this.manager.id, 'releaseDate', releaseDate).subscribe(
            () => this.manager.releaseDate = releaseDate, 
            error => this._handleError("Impossible d'indiquer la sortie des effectifs")
          )
        }
      }); 
  }


  public onDelete() : void {
    this._managerService.deleteManager(this.manager.id).subscribe(
      () => this._router.navigate(['/managers']),
      error => this._handleError("Impossible de supprimer ce manager")
    )
  }

  public goToConsultantPage(consultant : number) {
    this._router.navigateByUrl('consultants/' + consultant);
  }

  public onCancelReleaseDate() : void {
    this._managerService.updateManager(this.manager.id,'releaseDate',null).subscribe(
      () => this.manager.releaseDate = null,
      (error) => this._handleError("Impossible de rendre ce manager actif à nouveau")
    );
  }

  private _handleError(message : string) : void {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }
}
