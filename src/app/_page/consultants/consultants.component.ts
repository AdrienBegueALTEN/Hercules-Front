import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConsultantService } from '../../_services/consultant.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeactivateComponent } from '../../dialog/deactivate/deactivate.component';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConsultantsComponent implements OnInit, OnDestroy {
  user;
  isAuthenticated = false;
  userIsAdmin = false;
  userIsManager = false;
  navigationSubscription;
  onlyMyConsultantChecked = true;
  consultants: any[];
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['firstname', 'lastname', 'email', 'manager', 'actions'];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private consultantService: ConsultantService, 
    private _bottomSheet: MatBottomSheet,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private router:Router) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy(){
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  initialize(){
    this.isAuthenticated = !!this._authService.getToken();

    if (this.isAuthenticated) {
      this.user = this._authService.getUser();
      
      this.userIsManager = this.user.roles.includes('MANAGER');
    }

    this.consultantService.getConsultants(false).subscribe(
      (data) => {
        this.consultants = data;
        this.createDatasource(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  openBottomSheet(element: any): void {
    const bootomSheet = this._bottomSheet.open(DeactivateComponent, {
      data: { consultant: element },
    });
    bootomSheet.instance.deactivationDate.subscribe(
      (data) => {
        this.consultantService.updateConsultant(element.id,'releaseDate',data).subscribe(
          ()=>{
            this.ngOnInit();
          },
          (err) => {console.log(err)}
        )
      },
      (err) => {
        console.log(err);
      }
    );
  }

  printData(data): void {
    console.log(data);
  }

  createDatasource(data) {
    if (this.onlyMyConsultantChecked && this.userIsManager) {
      this.dataSource = new MatTableDataSource(data.filter((cons) => cons.manager.id == this.user.id));
    }
    else {
      this.dataSource = new MatTableDataSource(data);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  /**
   * Surch in sub-object
   * @param search 
   * @param data 
   * @param key 
   */
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showOnlyMyConsultant() {
    this.onlyMyConsultantChecked = !this.onlyMyConsultantChecked;
    this.createDatasource(this.consultants);
  }

  private delete(consultant:any){
    this.consultantService.deleteConsultant(consultant.id).subscribe(
      ()=>{
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  openDeleteDialog(element: any): void {
    const dialog = this._dialog.open(YesNoDialogComponent, {
      data: { 
        title: 'Supprimer le consultant '+element.firstname+' '+element.lastname+'.' ,
        message: 'Voulez-vous continuer ?',
        yes:'Supprimer '+element.firstname+' '+element.lastname,
        no:'Annuler'
      },
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.delete(element);
        }
      }
    );
  }

  rgpd(){
    this.consultantService.updateForRgpd().subscribe(
      ()=>{
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    )
  }
}

