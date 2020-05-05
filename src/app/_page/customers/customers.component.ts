import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  customers: any[];
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['name', 'activitySector', 'nbMissions', 'actions'];

  constructor(private _customerService: CustomerService,
    private _bottomSheet: MatDialog) { }


  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this._customerService.getAll().subscribe(
      (data) => {
        this.customers = data;
        this.createDatasource(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  createDatasource(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(customer:any){
    this._customerService.deleteCustomer(customer.id).subscribe(
      () => {},
      (err) => {
        console.log(err);
      }
    )
  }

  openDialog(element: any): void {
    const dialog = this._bottomSheet.open(YesNoDialogComponent, {
      data: { 
        title: 'Supprimez le client '+element.name ,
        message: 'Voulez-vous continuer ?',
        yes:'Supprimer '+element.name,
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
}
