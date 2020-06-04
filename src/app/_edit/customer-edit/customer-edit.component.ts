import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/_services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/_dialog/message/message-dialog.component';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  @Input() customer : any;
  @Output() reload = new EventEmitter<any>();
  srcLogo;
  constructor(private _customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.srcLogo = 'http://localhost:8080/hercules/customers/logo/'+this.customer.logo;
  }

  updateCustomer(customer: any){
    this._customerService.updateCustomer(customer).subscribe(
      ()=>{
        this._snackBar.open('Mise à jour effectuée.', 'X', {duration: 2000});
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  private _showErrorDialog(message : string) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this._dialog.open(MessageDialogComponent, dialogConfig);
  }

  addImage(image){
    console.log(image)
    this._customerService.upload(image, this.customer.id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          if(event.status==200){
            this._snackBar.open('Logo changé', 'X', {duration: 2000});
            this.customer.logo = image.name;
            this.srcLogo = 'http://localhost:8080/hercules/customers/logo/'+this.customer.logo;
          }
          else
            this._showErrorDialog("Impossible de charger cette image.");
        }
      },
      err => {
        this._showErrorDialog("Impossible de charger cette image.");
      });
  }

  deleteLogo(){
    console.log(this.customer.id);
    this._customerService.removeLogo(this.customer.id).subscribe(
      ()=>{
        this._snackBar.open('Logo supprimé.', 'X', {duration: 2000});
        this.customer.logo = null;
      },
      (err)=>{
        console.log(err);
      }
    )
  }


}
