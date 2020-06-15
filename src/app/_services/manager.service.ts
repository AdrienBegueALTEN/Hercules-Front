import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _httpClient : HttpClient) { }

  getAll(enabled: boolean) : Observable<any[]> {
    if(enabled===true)
      return this._httpClient.get<any[]>(AppSettings.MANAGER_API + '?enabled=true', AppSettings.HTTP_JSON_CONTENT);
    else
      return this._httpClient.get<any[]>(AppSettings.MANAGER_API + '?enabled=false', AppSettings.HTTP_JSON_CONTENT);
  }

  getManagerById(id : String) : Observable<any> {
    return this._httpClient.get<any[]>(AppSettings.MANAGER_API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  addManager(email : String, firstname : String, lastname : String, admin : boolean) : Observable<any> {
    return this._httpClient.post(AppSettings.MANAGER_API,
      { 
        "email" : email,
        "firstname" : firstname,
        "lastname" : lastname,
        "isAdmin" : admin
        
      },
      {observe : 'response'});
  }

  updateManager(id : number, fieldName : String, value : any) : Observable<any> {
    return this._httpClient.put(AppSettings.MANAGER_API,
      { 
        "id" : id,
        "fieldName" : fieldName,
        "value" : value
      },
      {observe : 'response'});
  }

  deleteManager(id : String) {
    return this._httpClient.delete(AppSettings.MANAGER_API + id);
  }
}
