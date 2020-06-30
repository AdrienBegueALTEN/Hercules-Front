import { Injectable } from '@angular/core';
import { AppSettings } from './../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API : string = AppSettings.API_ENDPOINT + 'consultants/';

/**
 * The purpose of this service is to fetch, create, edit and delete consultants from the API
 */
@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private _httpClient : HttpClient) {}


  /**
   * Retrieves all consultants or only those still active (ie consultants still working for the company) from the API
   * @param active Indicates if only active consultants should be returned. <br> If true, only returns active consultants <br> If false, returns all consultants
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
   * Deletes a consultant from its ID
   * @param id Consultant ID
   */
  public deleteConsultant(id : number) : Observable<any> {
    return this._httpClient.delete(API + id, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * 
   * @param id Consultant ID
   * @param fieldname Edited field
   * @param value New value
   */
  public updateConsultant(id : number, fieldname : String, value : any) : Observable<any> {
    return this._httpClient.put(API,
      {
        id : id,
        fieldname : fieldname,
        value : value,
      },
      {observe: 'response'});
  }

  /**
   * Add diploma to a new consultant
   * @param consultant ID of the involved consultant
   * @param establishment School attended by the consultant
   * @param entitled Diploma title
   * @param level Diploma level
   * @param year Graduation year
   */
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
  
    /**
     * Update the diploma fields
     * @param diploma Diploma ID
     * @param fieldname Edited field
     * @param value New diploma value
     */
  public updateDiploma(diploma : number, fieldname : string, value : any) : Observable<any> {
    return this._httpClient.put(API + "update-diploma",
      {
        id: diploma,
        fieldname: fieldname,
        value: value
      },
      AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Deletes a diploma linked to the consultant
   * @param consultant Consultant ID
   * @param diploma Diploma ID
   */
  public removeDiploma(consultant : number, diploma : number): Observable<any> {
    return this._httpClient.put(API + "remove-diploma",
    {
      consultant: consultant,
      diploma: diploma
    }
    , AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Get all missions from a consultant
   * @param consultant Consultant ID
   */
  public getMissions(consultant : number) : Observable<any> {
    return this._httpClient.get(API + consultant + '/missions');
  }
}


