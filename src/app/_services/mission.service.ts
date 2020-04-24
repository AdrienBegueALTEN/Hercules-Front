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
        consultantId : consultant,
        customerId : customer,
      },
    AppSettings.HTTP_OPTIONS);
  }
}
