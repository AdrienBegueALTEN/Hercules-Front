import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';

const API : string = AppSettings.API_ENDPOINT + 'grdp/';

@Injectable({
  providedIn: 'root'
})
export class GRDPService {

  constructor(private _httpClient : HttpClient) {}

  public applyGRDP() : Observable<any> {
    return this._httpClient.put(API, {});
  }
}