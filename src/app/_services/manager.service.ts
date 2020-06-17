import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';

const API : string = AppSettings.API_ENDPOINT + 'managers/';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _httpClient : HttpClient) { }

  getAll(onlyActive: boolean) : Observable<any[]> {
      return this._httpClient.get<any[]>(API + '?onlyActive=' + onlyActive, AppSettings.HTTP_JSON_CONTENT);
  }

  getManagerById(id : String) : Observable<any> {
    return this._httpClient.get(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  addManager(email : String, firstname : String, lastname : String, admin : boolean) : Observable<any> {
    return this._httpClient.post(API,
      { 
        email : email,
        firstname : firstname,
        lastname : lastname,
        isAdmin : admin
      },
      {observe : 'response'});
  }

  updateManager(id : number, fieldname : String, value : any) : Observable<any> {
    return this._httpClient.put(API,
      { 
        id : id,
        fieldname : fieldname,
        value : value
      },
      {observe : 'response'});
  }

  deleteManager(id : String) {
    return this._httpClient.delete(API + id);
  }
}
