import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';

/**
 * Handles customer data
 */
@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent implements OnInit {
  /**
   * Customer object
   */
  public customer: any;
  /**
   * True : The user is manager
   * False : The user isn't a manager
   */
  public manager : boolean = this._authService.userIsManager();
  /**
   * Gets every information about the user
   */
  public user : any = this._authService.getUser();
  /**
   * Contains every mission involving the customer
   */
  public customersMissions : any[];

  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _customerService: CustomerService,
    private _authService: AuthService
  ) {}

  public ngOnInit() : void {
    const customer : number = this._route.snapshot.params['id'];
    this._customerService.getCustomer(customer).subscribe(
      (customer) => {
        this.customer = customer;
        this._customerService.getMissions(this.customer.id).subscribe(
          customersMissions => this.customersMissions = customersMissions,
          error => console.log(error)
        )
      },
      () => this._router.navigate(['/not-found'])
    );
  }

  /**
   * Deletes a customer
   * It he can't be deleted, returns an error message to the user
   */
  public onDelete() : void {
    this._customerService.deleteCustomer(this.customer.id).subscribe(
      () => this._router.navigate(['/customers']),
      error => console.log(error)
    )
  }
}
