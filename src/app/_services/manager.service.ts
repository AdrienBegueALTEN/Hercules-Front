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

  /**
   * 
   * @param onlyActive If true, only returns active managers. If false, returns any consultants
   */
  getAll(onlyActive: boolean) : Observable<any[]> {
      return this._httpClient.get<any[]>(API + '?onlyActive=' + onlyActive, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Gets manager informatons by its ID
   * @param id Manager ID
   */
  getManagerById(id : String) : Observable<any> {
    return this._httpClient.get(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Adds a new manager
   * @param email Email of the recruitement officer to add
   * @param firstname First name of the recruitement officer to add
   * @param lastname Last name of the recruitement officer to add
   * @param admin True, if user wants new manager to be admin
   */
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

  /**
   * 
   * @param id 
   * @param fieldname 
   * @param value 
   */
  updateManager(id : number, fieldname : String, value : any) : Observable<any> {
    return this._httpClient.put(API,
      { 
        id : id,
        fieldname : fieldname,
        value : value
      },
      {observe : 'response'});
  }

  /**
   * Deletes manager by its ID
   * @param id Manager ID
   */
  deleteManager(id : String) {
    return this._httpClient.delete(API + id);
  }
}
