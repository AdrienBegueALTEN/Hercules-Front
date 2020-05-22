import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _httpClient : HttpClient) { }

  getAll() : Observable<any[]> {
    return this._httpClient.get<any[]>(AppSettings.MANAGER_API, AppSettings.HTTP_JSON_CONTENT);
  }

  addManager(email : String, firstname : String, lastname : String, admin : boolean) : Observable<any> {
    return this._httpClient.post(AppSettings.MANAGER_API,
      { 
        "email" : email,
        "firstname" : firstname,
        "lastname" : lastname,
        "isAdmin" : admin
        
      },
      {observe : 'response' });
  }
}
