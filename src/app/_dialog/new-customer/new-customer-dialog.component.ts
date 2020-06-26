import { Component, ViewChild, Inject } from '@angular/core';
import { NewCustomerComponent } from 'src/app/_input/new-customer/new-customer.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for the dialog window that serves to create a new customer
 */
@Component({
  selector: 'app-new-customer-dialog',
  templateUrl: './new-customer-dialog.component.html'
})
export class NewCustomerDialogComponent {
  /**
   * Child component for the inputs
   */
  @ViewChild('newCustomer') newUser: NewCustomerComponent;

  constructor(
    private _dialogRef: MatDialogRef<NewCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customers : any[]
  ) {}

  /**
   * Function activated when a new customer is submitted and it closes the window and sends the data.
   */
  public onSubmit() : void {
    let customer : any = {
      name: this.newUser.grp.controls['name'].value,
      activitySector: this.newUser.grp.controls['activitySector'].value
    };
    this._dialogRef.close(customer);
  }
}
