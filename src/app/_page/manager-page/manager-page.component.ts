import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/_services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeactivateComponent } from 'src/app/_dialog/deactivate/deactivate.component';
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
          firstname : this.manager.firsrname,
          lastname : this.manager.lastname
        };
    const dialogRef = this._dialog.open(DeactivateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      releaseDate => {
        if (releaseDate) {
          this._managerService.updateManager(this.manager.id, 'releaseDate', releaseDate).subscribe(
            () => this.manager.releaseDate = releaseDate, 
            error => console.log(error)
          )
        }
      }); 
  }

  public onDelete() : void {
    this._managerService.deleteManager(this.manager.id).subscribe(
      () => this._router.navigate(['/recruitment-officers']),
      error => console.log(error)
    )
  }

  public goToConsultantPage(consultant : number) {
    this._router.navigateByUrl('consultants/' + consultant);
  }
}
