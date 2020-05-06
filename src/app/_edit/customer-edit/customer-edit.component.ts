import { Component, OnInit, Input } from '@angular/core';
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
  
  constructor(private _customerService: CustomerService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
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


}
