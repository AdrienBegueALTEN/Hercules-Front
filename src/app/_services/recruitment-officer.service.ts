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

  getRecruitmentOfficers() : Observable<any[]> {
      return this._httpClient.get<any[]>(API, AppSettings.HTTP_JSON_CONTENT);
  }

  getRecruitmentOfficerById(id : String) : Observable<any> {
    return this._httpClient.get(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  addRecruitmentOfficer(firstname: String, lastname: String, email: String) : Observable<any> {
      return this._httpClient.post(API,
        { 
          email : email,
          firstname : firstname,
          lastname : lastname
        },
        {observe : 'response'});
  }

  deleteRecruitmentOfficer(id : String) {
      return this._httpClient.delete(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

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
