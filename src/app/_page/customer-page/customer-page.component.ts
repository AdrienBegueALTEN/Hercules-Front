import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Role } from 'src/app/_enums/role.enum';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent implements OnInit {
  customer: any;
  writingRights : boolean = false;

  constructor(private _route: ActivatedRoute,
    private _customerService: CustomerService,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    const id : number = this._route.snapshot.params['id'];
    this._customerService.getById(id).subscribe(
      (data) => {
        this.customer = data;
        const user = this._authService.getUser();
        this.writingRights = user.roles.includes(Role.MANAGER);
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
