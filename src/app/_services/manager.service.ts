import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _httpClient : HttpClient) { }

  getAll(basic : boolean) : Observable<any[]> {
    return this._httpClient.get<any[]>(AppSettings.MANAGER_API + '?basic=' + basic, AppSettings.HTTP_JSON_CONTENT);
  }
}
