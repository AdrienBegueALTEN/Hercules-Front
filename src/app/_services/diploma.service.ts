import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class DiplomaService {

  constructor(private _httpClient : HttpClient) { }

  updateDiploma(dipl: any) : Observable<any> {
    return this._httpClient.put(AppSettings.DIPLOMA_API, dipl, {observe: 'response'});
  }

  getAll(){
    return this._httpClient.get<any>(AppSettings.DIPLOMA_API);
  }

  deleteDiploma(request): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: request
    }
    return this._httpClient.delete(AppSettings.DIPLOMA_API, options);
  }

  addDiploma(request) : Observable<any>{ 
    return this._httpClient.post<any>(AppSettings.DIPLOMA_API,request);
}
}
