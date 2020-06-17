import { Injectable } from '@angular/core';
import { AppSettings } from './../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API : string = AppSettings.API_ENDPOINT + 'consultants/';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private _httpClient : HttpClient) {}

  getConsultants(enabled : boolean = false) : Observable<any[]> {
    return this._httpClient.get<any[]>(API + '?enabled=' + enabled, AppSettings.HTTP_JSON_CONTENT);
  }

  getConsultant(id:number){
    return this._httpClient.get<any>(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  newConsultant(email : string, firstname : string, lastname : string, manager : number) : Observable<any> {
    return this._httpClient.post(API,
      {
        email : email,
        lastname : lastname,
        firstname : firstname,
        manager : manager
      },
      {observe: 'response'});
  }

  deleteConsultant(id : number) : Observable<any> {
    return this._httpClient.delete(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  updateConsultant(id : number, fieldname : String, value : any) : Observable<any> {
    return this._httpClient.put(API,
      {
        id : id,
        fieldname : fieldname,
        value : value,
      },
      {observe: 'response'});
  }

  addDiploma(consultant : number, establishment : string, entitled : string, level : string, year : number) : Observable<any> {
    return this._httpClient.put(API + "add-diploma",
      {
        consultant: consultant,
        establishment: establishment,
        entitled: entitled,
        level: level,
        year: year
      },
      AppSettings.HTTP_JSON_CONTENT);
    }
  
  updateDiploma(diploma : number, fieldname : string, value : any) : Observable<any> {
    return this._httpClient.put(API + "update-diploma",
      {
        id: diploma,
        fieldname: fieldname,
        value: value
      },
      AppSettings.HTTP_JSON_CONTENT);
  }

  removeDiploma(consultant : number, diploma : number): Observable<any> {
    return this._httpClient.put(API + "remove-diploma",
    {
      consultant: consultant,
      diploma: diploma
    }
    , AppSettings.HTTP_JSON_CONTENT);
  }

  public getMissions(consultant : number) : Observable<any> {
    return this._httpClient.get(API + consultant + '/missions');
  }
}


