import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class GRDPService {

  constructor(private _httpClient : HttpClient) {}

  public applyGRDP() : Observable<any> {
    return this._httpClient.put(AppSettings.GRDP_API, {});
  }
}