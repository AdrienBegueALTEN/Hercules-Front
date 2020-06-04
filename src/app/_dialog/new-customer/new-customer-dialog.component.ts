import { Component, ViewChild, Inject } from '@angular/core';
import { NewCustomerComponent } from 'src/app/_input/new-customer/new-customer.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-customer-dialog',
  templateUrl: './new-customer-dialog.component.html'
})
export class NewCustomerDialogComponent {
  @ViewChild('newCustomer') newUser: NewCustomerComponent;

  constructor(
    private _dialogRef: MatDialogRef<NewCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customers : any[]
  ) {}

  public onSubmit() : void {
    let customer : any = {
      name: this.newUser.grp.controls['name'].value,
      activitySector: this.newUser.grp.controls['activitySector'].value
    };
    this._dialogRef.close(customer);
  }
}
