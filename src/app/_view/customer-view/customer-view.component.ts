import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html'
})
export class CustomerViewComponent implements OnInit {
  @Input() public customer : any;

  public logoSrc : string;

  readonly NAME_KEY = 'name';
  readonly ACTIVITY_SECTOR_KEY = 'activitySector';
  readonly DESCRIPTION_KEY = 'releaseDate';
  readonly XP_KEY = 'experience';

  public ngOnInit() : void {
    this.logoSrc = AppSettings.CUSTOMER_LOGO_PATH + this.customer.logo;
  }
}
