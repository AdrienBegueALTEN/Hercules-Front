import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { isUndefined } from 'util';
import { Router } from '@angular/router';
import { HttpStatus } from 'src/app/_enums/http-status.enum';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';
import { NewCustomerDialogComponent } from 'src/app/_dialog/new-customer/new-customer-dialog.component';

/**
 * Handles customers data
 */
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  /**
   * Customers array
   * Contains every customer
   */
  customers: any[];
  /**
   * Data source containing every customer, but formatted to make the array usable in customers table
   */
  dataSource: MatTableDataSource<any>;

  constructor(
    private _customerService : CustomerService,
    private _dialog : MatDialog,
    private _router : Router
  ) {}

  public ngOnInit() : void {
    this._customerService.getAll().subscribe(
      (data) => {
        this.customers = data;
        this.dataSource = new MatTableDataSource(data);
      },
      () => window.location.replace("")
    )
  }

  /**
   * Filter customers by the content of the search bar
   * @param event Event is triggered when an user types anything inside the search bar
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Creates a new customer
   * If it can't be created, returns an error message to the user
   */
  public newCustomer() : void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.customers;
    const dialogRef = this._dialog.open(NewCustomerDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (customer : any) => {
        if (isUndefined(customer)) return;
        this._customerService.newCustomer(customer.name, customer.activitySector).subscribe(
          (response) => {this._handleAddResponse(response); this.ngOnInit();},
          (error) => this._handleAddResponse(error)
        )
      }
    )
  }

  public goToCustomerPage(customer : number) {
    this._router.navigateByUrl('customers/' + customer);
  }

  private _handleAddResponse(response : Response) {
    if (response.status !== HttpStatus.CREATED) {
      let message : string = "Impossible d'ajouter ce client.";
      if (response.status === HttpStatus.ACCEPTED)
        message = message.concat(" Ce client existe déjà.");
      this._showMessageDialog(message);
    } else this.ngOnInit();
  }
  
  private _showMessageDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }
}
