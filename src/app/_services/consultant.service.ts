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


  /**
   * Retrieves all consultants or only those still active (ie consultants still working for the company) from the API
   * @param active Indicates if only active consultants should be returned. 
   * If true, only returns active consultants
   * If false, returns all consultants
   */
  public getConsultants(active : boolean = false) : Observable<any[]> {
    return this._httpClient.get<any[]>(API + '?active=' + active, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Retrieves informations from the API with consultant ID
   * @param id Consultant ID
   */
  public getConsultant(id:number){
    return this._httpClient.get<any>(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Creates a new consultant 
   * 
   * @param email Email of the new consultant
   * @param firstname First name of the new consultant
   * @param lastname Last name of the new consultant
   * @param manager Manager of the new consultant
   */
  public newConsultant(email : string, firstname : string, lastname : string, manager : number) : Observable<any> {
    return this._httpClient.post(API,
      {
        email : email,
        lastname : lastname,
        firstname : firstname,
        manager : manager
      },
      {observe: 'response'});
  }

  /**
   * Deletes a consultant
   * @param id Deletes a consultant with his id
   */
  public deleteConsultant(id : number) : Observable<any> {
    return this._httpClient.delete(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  public updateConsultant(id : number, fieldname : String, value : any) : Observable<any> {
    return this._httpClient.put(API,
      {
        id : id,
        fieldname : fieldname,
        value : value,
      },
      {observe: 'response'});
  }

  public addDiploma(consultant : number, establishment : string, entitled : string, level : string, year : number) : Observable<any> {
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
  
  public updateDiploma(diploma : number, fieldname : string, value : any) : Observable<any> {
    return this._httpClient.put(API + "update-diploma",
      {
        id: diploma,
        fieldname: fieldname,
        value: value
      },
      AppSettings.HTTP_JSON_CONTENT);
  }

  public removeDiploma(consultant : number, diploma : number): Observable<any> {
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


