import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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
    return this._httpClient.get<any>(AppSettings.CUSTOMER_API + id, AppSettings.HTTP_JSON_CONTENT);
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
    return this._httpClient.put(AppSettings.CUSTOMER_API, cust, AppSettings.HTTP_JSON_CONTENT);
  }

  upload(file: File, id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', AppSettings.CUSTOMER_API + id + '/logo', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._httpClient.request(req);
  }

  public removeLogo(customer : number): Observable<any> {
    return this._httpClient.delete(
      AppSettings.CUSTOMER_API + customer + '/logo');
  }

  public getMissions(customer: number) : Observable<any> {
    return this._httpClient.get(AppSettings.CUSTOMER_API + customer + '/missions');
  }
}
