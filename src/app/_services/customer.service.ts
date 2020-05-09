import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from './../app-settings';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient : HttpClient) {}

  getAll() : Observable<any[]> {
    return this._httpClient.get<any[]>(AppSettings.CUSTOMER_API, AppSettings.HTTP_JSON_CONTENT);
  }

  getById(id: number) : Observable<any[]> {
    return this._httpClient.get<any[]>(AppSettings.CUSTOMER_API + id, AppSettings.HTTP_OPTIONS);
  }

  newCustomer(name : string, activitySector : string) : Observable<any> {
    return this._httpClient.post(AppSettings.CUSTOMER_API,
      {
        name : name,
        activitySector : activitySector,
      },
      {observe: 'response'});
  }

  deleteCustomer(id : number) : Observable<any> {
    return this._httpClient.delete(AppSettings.CUSTOMER_API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  updateCustomer(cust: any) {
    return this._httpClient.put(AppSettings.CUSTOMER_API, cust, AppSettings.HTTP_OPTIONS);
  }
}
