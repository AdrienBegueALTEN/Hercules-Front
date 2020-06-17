import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent implements OnInit {
  public customer: any;
  public manager : boolean = this._authService.userIsManager();
  public user : any = this._authService.getUser();
  public customersMissions : any[];
  public userOwnsCustomer : boolean = false;

  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _customerService: CustomerService,
    private _authService: AuthService
  ){}


  public ngOnInit() : void {
    const customer : number = this._route.snapshot.params['id'];
    this._customerService.getCustomer(customer).subscribe(
      (customer) => {
        this.customer = customer;
        this._customerService.getMissions(this.customer.id).subscribe(
          customersMissions => { this.customersMissions = customersMissions;
                                 for (let mission of this.customersMissions) {
                                  if(mission.consultant.manager.id===this.user.id)
                                    this.userOwnsCustomer = true;
                                 } },
          error => console.log(error)
        )
      },
      () => this._router.navigate(['/not-found'])
    );
  }

  public onDelete() : void {
    this._customerService.deleteCustomer(this.customer.id).subscribe(
      () => this._router.navigate(['/customers']),
      error => console.log(error)
    )
  }
}
