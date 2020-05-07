import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private _notInteceptedHttpClient : HttpClient;

  constructor(
    private _httpBackend: HttpBackend,
    private _httpClient : HttpClient) {
      this._notInteceptedHttpClient = new HttpClient(this._httpBackend);
    }

  newMission(consultant : number, customer : number) : Observable<any> {
    return this._httpClient.post(AppSettings.MISSION_API,
      {
        consultant : consultant,
        customer : customer,
      },
    AppSettings.HTTP_JSON_CONTENT);
  }

  addVersion(mission : number) : Observable<any> {
    return this._httpClient.get(AppSettings.MISSION_API + 'new-version/' + mission);
  }

  getMissionDetails(mission : number) : Observable<any> {
    return this._httpClient.get(AppSettings.MISSION_API + mission);
  }

  getMissionDetailsFromToken(token : string) : Observable<any> {
    return this._notInteceptedHttpClient.get(AppSettings.MISSION_API + 'from-token', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) });
  }

  getMissions(): Observable<Mission[]> {
    return of(missions);
  }

  updateMission(id : number, fieldName : String, value : any) : Observable<any> {
    return this._httpClient.put(AppSettings.MISSION_API,
      {
        id : id,
        fieldName : fieldName,
        value : value,
      },
      AppSettings.HTTP_JSON_CONTENT);
  }
}

export interface Mission {
  id: number;
  customer: string;
  consultantId: number;
  title: string;
  status: number;
}


const missions: Mission[] = [
  {
    id: 1,
    customer: 'Airbus',
    consultantId: 1,
    title: 'Organisation de la logistique',
    status: 1
  },
  {
    id: 2,
    customer: 'Blondel',
    consultantId: 1,
    title: 'Transport de marchandises',
    status: 2
  },
  {
    id: 3,
    customer: 'Dassault',
    consultantId: 1,
    title: 'Fabrication d\'un aéronef',
    status: 1
  },
  {
    id: 4,
    customer: 'Microsoft',
    consultantId: 1,
    title: 'Développement d\'un module C#',
    status: 3
  },

  {
    id: 5,
    customer: 'Safran',
    consultantId: 1,
    title: 'Conception d\'engins ballistiques',
    status: 3
  },

  {
    id: 6,
    customer: 'Sagem',
    consultantId: 1,
    title: 'Étude de l\'orientation d\'une antenne',
    status: 3
  },

  {
    id: 7,
    customer: 'Orange',
    consultantId: 1,
    title: 'Déploiement de la fibre optique',
    status: 3
  }
].sort((a, b) => a.status - b.status);



