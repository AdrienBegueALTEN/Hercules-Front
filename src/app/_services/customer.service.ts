import { BasicCustomer } from './../_interface/basic-customer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from './../app-settings';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

constructor(private _httpClient : HttpClient) {}

  getBasicCustomers() : Observable<BasicCustomer[]> {
    return this._httpClient.get<BasicCustomer[]>(AppSettings.CUSTOMER_API + '?basic=true', AppSettings.HTTP_OPTIONS);
  }

  addCustomer(name : string, activitySector : string) : Observable<any> {
    return this._httpClient.post(AppSettings.CUSTOMER_API,
      {
        name : name,
        activitySector : activitySector,
      },
    AppSettings.HTTP_OPTIONS);
  }

}
