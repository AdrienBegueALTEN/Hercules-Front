import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from './../app-settings';

const API : string = AppSettings.API_ENDPOINT + 'customers/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient : HttpClient) {}

  getAll() : Observable<any[]> {
    return this._httpClient.get<any[]>(API, AppSettings.HTTP_JSON_CONTENT);
  }

  getCustomer(id: number) : Observable<any> {
    return this._httpClient.get(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  newCustomer(name : string, activitySector : string) : Observable<any> {
    return this._httpClient.post(API,
      {
        name : name,
        activitySector : activitySector,
      },
      {observe: 'response'});
  }

  deleteCustomer(id : number) : Observable<any> {
    return this._httpClient.delete(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  updateCustomer(cust: any) {
    return this._httpClient.put(API, cust, AppSettings.HTTP_JSON_CONTENT);
  }

  upload(file: File, id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', API + id + '/logo', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._httpClient.request(req);
  }

  public removeLogo(customer : number): Observable<any> {
    return this._httpClient.delete(API + customer + '/logo');
  }

  public getMissions(customer: number) : Observable<any> {
    return this._httpClient.get(API + customer + '/missions');
  }
}
