import { Injectable } from '@angular/core';
import { AppSettings } from './../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private _httpClient : HttpClient) {}

  getAll(enabled : boolean) : Observable<any[]> {
    return this._httpClient.get<any[]>(AppSettings.CONSULTANT_API + '?enabled=' + enabled, AppSettings.HTTP_OPTIONS);
  }

  getById(id:number){
    return this._httpClient.get<any>(AppSettings.CONSULTANT_API + id, AppSettings.HTTP_OPTIONS);
  }

  newConsultant(email : string, firstname : string, lastname : string, manager : number) : Observable<any> {
    return this._httpClient.post(AppSettings.CONSULTANT_API,
      {
        email : email,
        lastname : lastname,
        firstname : firstname,
        manager : manager
      },
      {observe: 'response'});
  }

  deleteConsultant(id : number) : Observable<any> {
    return this._httpClient.delete(AppSettings.CONSULTANT_API + id, AppSettings.HTTP_OPTIONS);
  }
}
