import { HttpStatus } from './../../_enums/http-status.enum';
import { Component, Input, Output, EventEmitter, AfterContentInit, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from 'src/app/app-settings';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
  @Input() public customer : any;
  
  public logoSrc : string = null;
  
  constructor(
    private _customerService: CustomerService,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit() : void {
    if (this.customer.logo)
      this.logoSrc = AppSettings.CUSTOMER_LOGO_PATH + this.customer.logo;
  }

  public updateCustomer(customer: any) : void{
    this._customerService.updateCustomer(customer).subscribe(
      () => this._snackBar.open('Mise à jour effectuée.', 'X', {duration: 2000}),
      error => console.log(error)
    );
  }

  public onAddLogo(logo : any) {
    this._customerService.upload(logo, this.customer.id).subscribe(
      event => {
        if (event instanceof HttpResponse && event.status === HttpStatus.OK)
          this.logoSrc = AppSettings.CUSTOMER_LOGO_PATH + logo.name;
      },
      error => console.log(error)
    );
  }

  public onRemoveLogo() : void {
    this._customerService.removeLogo(this.customer.id).subscribe(
      () => this.logoSrc = null,
      error => console.log(error)
    )
  }
}
