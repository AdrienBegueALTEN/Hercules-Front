import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app-settings';

const API : string = AppSettings.API_ENDPOINT + 'recruitment-officers/';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentOfficerService {

  constructor(private _httpClient : HttpClient) { }

  /**
   * Gets any recruitement officers
   */
  getRecruitmentOfficers() : Observable<any[]> {
      return this._httpClient.get<any[]>(API, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Get recruitement officer information by its ID
   * @param id Recruitement officer ID
   */
  getRecruitmentOfficerById(id : String) : Observable<any> {
    return this._httpClient.get(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Add recruitement officer
   * @param firstname First name of the recruitement officer to add
   * @param lastname Last name of the recruitement officer to add
   * @param email Email of the recruitement officer to add
   */
  addRecruitmentOfficer(firstname: String, lastname: String, email: String) : Observable<any> {
      return this._httpClient.post(API,
        { 
          email : email,
          firstname : firstname,
          lastname : lastname
        },
        {observe : 'response'});
  }

  /**
   * 
   * @param id Recruitement officer ID
   */
  deleteRecruitmentOfficer(id : String) {
      return this._httpClient.delete(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Update recruitement officer informations
   * @param id Recruitement officer ID
   * @param fieldname Field to update
   * @param value New value
   */
  updateRecruitmentOfficer(id : number, fieldname : String, value : any) : Observable<any>{
  
    return this._httpClient.put(API,
      { 
        id : id,
        fieldname : fieldname,
        value : value
      },
      {observe : 'response'});
  }
}
