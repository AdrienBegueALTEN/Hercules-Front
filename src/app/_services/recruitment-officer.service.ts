import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app-settings';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentOfficerService {

  

  constructor(private _httpClient : HttpClient) { }

  getRecruitmentOfficers() : Observable<any[]> {
      return this._httpClient.get<any[]>(AppSettings.RECRUITMENTOFFICER_API, AppSettings.HTTP_JSON_CONTENT);
  }

  addRecruitmentOfficer(firstname: String, lastname: String, email: String) {
    //à faire
  }
  

}
