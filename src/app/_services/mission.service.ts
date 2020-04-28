import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private _httpClient : HttpClient) {}

  newMission(consultant : number, customer : number) : Observable<any> {
    return this._httpClient.post(AppSettings.MISSION_API,
      {
        consultant : consultant,
        customer : customer,
      },
    AppSettings.HTTP_OPTIONS);
  }

  getMissionDetails(mission : number) : Observable<any> {
    return this._httpClient.get(AppSettings.MISSION_API + mission, AppSettings.HTTP_OPTIONS);
  }
}
