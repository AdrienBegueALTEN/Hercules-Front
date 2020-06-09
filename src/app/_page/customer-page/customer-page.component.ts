import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent implements OnInit {
  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;
  customer: any;
  writingRights : boolean = this._authService.userIsManager();
  customersMissions : any[];

  constructor(private _route: ActivatedRoute,
    private _customerService: CustomerService,
    private _authService: AuthService) { }

  ngOnInit(): void {
    const id : number = this._route.snapshot.params['id'];
    this._customerService.getById(id).subscribe(
      (data) => {
        this.customer = data;
        this._customerService.getMissions(this.customer.id).subscribe(
          (customersMissions) => this.customersMissions = customersMissions
        )
      },
      () => window.location.replace('not-found')
    )
  }
}
