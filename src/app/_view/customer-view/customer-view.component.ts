import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

/**
 * Defines the keys used in customer view component and customer logo path
 */
@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html'
})
export class CustomerViewComponent implements OnInit {
  /**
   * Gets customer object
   */
  @Input() public customer : any;

  /**
   * Contains customer logo path
   */
  public logoSrc : string;

  /**
   * Name key
   */
  readonly NAME_KEY = 'name';
  /**
   * Activity sector key
   */
  readonly ACTIVITY_SECTOR_KEY = 'activitySector';
  /**
   * Description key
   */
  readonly DESCRIPTION_KEY = 'releaseDate';
  /**
   * Experience key
   */
  readonly XP_KEY = 'experience';

  public ngOnInit() : void {
    this.logoSrc = AppSettings.CUSTOMER_LOGO_PATH + this.customer.logo;
  }
}
