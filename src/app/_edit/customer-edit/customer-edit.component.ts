import { DialogUtilsService } from './../../_services/utils/dialog-utils.service';
import { HttpStatus } from './../../_enums/http-status.enum';
import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from 'src/app/app-settings';
import { HttpResponse } from '@angular/common/http';
/**
 * Component for the parts that serve to modify a customer
 */
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
  /**
   * object with the details of the customer
   */
  @Input() public customer : any;
  
  /**
   * path of the logo of the customer
   */
  public logoSrc : string = null;
  
  constructor(
    private _customerService : CustomerService,
    private _dialogUtils : DialogUtilsService,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit() : void {
    if (this.customer.logo)
      this.logoSrc = AppSettings.CUSTOMER_LOGO_PATH + this.customer.logo;
  }

  /**
   * Function activated when a customer is updated and it sends an http request to modify the customer in the database
   * @param customer object with the details of the customer
   */
  public updateCustomer(customer: any) : void{
    this._customerService.updateCustomer(customer).subscribe(
      () => this._snackBar.open('Mise à jour effectuée.', 'X', {duration: 2000}),
      error => console.log(error)
    );
  }

  /**
   * Function activated when a user uploads a logo, it sends an http request to save it and then display appropriate messages
   * @param logo  object with the details of the logo
   */
  public onAddLogo(logo : any) {
    this._customerService.upload(logo, this.customer.id).subscribe(
      event => {
        
        if (event instanceof HttpResponse) {
          if (event.status === HttpStatus.OK)
            this.logoSrc = AppSettings.CUSTOMER_LOGO_PATH + logo.name;
          else
            this._dialogUtils.showMsgDialog("Impossible de charger cette image.");
        }
      },
      err => {
        if(err.status == HttpStatus.BAD_REQUEST){
          this._dialogUtils.showMsgDialog("Le logo n'a pas été chargé, seules les images de moins de 3 Mo en .jpg, .jpeg, .png, .gif, .bmp, .tif et .tiff sont acceptées.");
        }
        else
          this._dialogUtils.showMsgDialog("Impossible de charger cette image.");
      });
  }

  /**
   * Function activated when the user removes the logo and it sends an http request to delete it from the database
   */
  public onRemoveLogo() : void {
    this._customerService.removeLogo(this.customer.id).subscribe(
      () => this.logoSrc = null,
      error => console.log(error)
    )
  }
}
