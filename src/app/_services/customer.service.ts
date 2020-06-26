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

  /**
   * Fetches all customers from the API
   */
  getAll() : Observable<any[]> {
    return this._httpClient.get<any[]>(API, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Fetches customer informations by its ID 
   * @param id Customer ID
   */
  getCustomer(id: number) : Observable<any> {
    return this._httpClient.get(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Creates a new customer
   * @param name Customer name
   * @param activitySector Activity sector of the customer
   */
  newCustomer(name : string, activitySector : string) : Observable<any> {
    return this._httpClient.post(API,
      {
        name : name,
        activitySector : activitySector,
      },
      {observe: 'response'});
  }

  /**
   * Deletes a customer by its ID
   * @param id Customer ID
   */
  deleteCustomer(id : number) : Observable<any> {
    return this._httpClient.delete(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  updateCustomer(cust: any) {
    return this._httpClient.put(API, cust, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Upload a customer logo from the customer ID
   * @param file Customer logo (image file)
   * @param id Customer ID
   */
  upload(file: any, id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('blob', file.blob);
    formData.append('name', file.name);

    const req = new HttpRequest('POST', API + id + '/logo', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._httpClient.request(req);
  }

  /**
   * Deletes a customer logo from the customer ID
   * @param customer Customer ID
   */
  public removeLogo(customer : number): Observable<any> {
    return this._httpClient.delete(API + customer + '/logo');
  }

  /**
   * Fetches all missions from a specific customer by its ID
   * @param customer Customer ID
   */
  public getMissions(customer: number) : Observable<any> {
    return this._httpClient.get(API + customer + '/missions');
  }
}
