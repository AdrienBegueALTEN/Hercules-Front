import { BasicConsultant } from './../_interface/basic-consultant';
import { Injectable } from '@angular/core';
import { AppSettings } from './../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private _httpClient : HttpClient) {}

  getEnabledConsultants() : Observable<BasicConsultant[]> {
    return this._httpClient.get<BasicConsultant[]>(AppSettings.CONSULTANT_API + '?basic=true', AppSettings.HTTP_OPTIONS);
  }

  getAll() : Observable<any[]> {
    return this._httpClient.get<any[]>(AppSettings.CONSULTANT_API + 'all', AppSettings.HTTP_OPTIONS);
  }

  getById(id:number){
    return this._httpClient.get<any>(AppSettings.CONSULTANT_API + id, AppSettings.HTTP_OPTIONS);
  }

  newConsultant(email : string, firstname : string, lastname : string, xp : number, manager : number) : Observable<any> {
    return this._httpClient.post(AppSettings.CONSULTANT_API,
      {
        email : email,
        lastname : lastname,
        firstname : firstname,
        experience : xp,
        manager : manager
      },
      AppSettings.HTTP_OPTIONS);
  }
}
