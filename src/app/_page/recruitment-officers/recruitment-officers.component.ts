import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';

@Component({
  selector: 'app-recruitment-officers',
  templateUrl: './recruitment-officers.component.html',
  styleUrls: ['./recruitment-officers.component.scss']
})
export class RecruitmentOfficersComponent implements OnInit,OnDestroy {


  user;
  isAuthenticated = false;
  recruitmentOfficerSubscription : Subscription;
  recruitmentOfficers : any[];
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['firstname', 'lastname', 'email', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private _recruitmentOfficerService: RecruitmentOfficerService, 
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _router:Router) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    if(this.recruitmentOfficerSubscription){
      this.recruitmentOfficerSubscription.unsubscribe();
    }

  }

  initialize() : void {
    this.isAuthenticated = !!this._authService.getToken();

    if(this.isAuthenticated){
      this.user = this._authService.getUser();
    }

    this._recruitmentOfficerService.getRecruitmentOfficers().subscribe(
      (data) => {
        this.recruitmentOfficers = data;
        this.createDatasource(data);
      },
      (err) => {
        this.dialogBadStart();
      }
    );

  }

  createDatasource(data) : void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToCreateNewRecruitmentOfficer(){
    this._router.navigate(['/new-recruitment-officer']);
  }

  deleteRecruitmentOfficer(recruitmentOfficer : any) : void {
    this._recruitmentOfficerService.deleteRecruitmentOfficer(recruitmentOfficer.id).subscribe(
      () => { this._recruitmentOfficerService.getRecruitmentOfficers().subscribe(
                (data) => {
                            this.recruitmentOfficers = data;
                            this.createDatasource(data);
                          },
                (err) =>  {
                            this.dialogBadStart();
                          }
              );},
      (error) => { this.openDialogError(error,recruitmentOfficer); }
    );
    
  }

  openDialogDelete(element: any): void {
    const dialog = this._dialog.open(YesNoDialogComponent, {
      data: { 
        title: 'Supprimer le CDR '+element.firstname+" "+element.lastname ,
        message: 'Voulez-vous continuer ?',
        yes:'Supprimer ',
        no:'Annuler'
      }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.deleteRecruitmentOfficer(element);
        }
      }
    );
  }

  openDialogError(error : String, recruitmentOfficer: any) : void {
      const dialog = this._dialog.open(OkDialogComponent, {
        data: {
          title: error,
          message: recruitmentOfficer.firstname+" "+ recruitmentOfficer.lastname+ " n'a pas pu être supprimé",
          ok: 'Continuer'
        }
      });

      
  }

  dialogBadStart() : void {
    const  dialog = this._dialog.open(MessageDialogComponent, {
      data: "Impossible de charger les chargés de recrutement"
    });
  }

}
