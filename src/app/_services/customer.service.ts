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

  newCustomer(name : string, activitySector : string, description : string) : Observable<any> {
    return this._httpClient.post(AppSettings.CUSTOMER_API,
      {
        name : name,
        activitySector : activitySector,
        description : description
      },
      {observe: 'response'});
  }

  deleteCustomer(id : number) : Observable<any> {
    return this._httpClient.delete(AppSettings.CUSTOMER_API + id, AppSettings.HTTP_OPTIONS);
  }

}
