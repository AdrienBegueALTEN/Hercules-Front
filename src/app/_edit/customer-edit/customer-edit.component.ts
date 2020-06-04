import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/_services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar) { }

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

  setSrc(name){
    this.customer.logo = name;
    this.ngOnInit();
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
