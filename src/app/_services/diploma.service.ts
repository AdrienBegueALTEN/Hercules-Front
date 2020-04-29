import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
