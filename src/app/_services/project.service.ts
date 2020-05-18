import {Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _notInteceptedHttpClient : HttpClient;

  constructor(
    private _httpBackend: HttpBackend,
    private _httpClient : HttpClient) {
      this._notInteceptedHttpClient = new HttpClient(this._httpBackend);
    }
  getProjects(): Observable<Project[]> {
    return of(projects);
  }

  public newProject(mission : number): Observable<any>{
    return this._httpClient.post(AppSettings.PROJECT_API,{missionId: mission},AppSettings.HTTP_JSON_CONTENT);
  }

  public updateProject(id : number, fieldName : String, value : any) : Observable<any> {
    return this._httpClient.put(AppSettings.PROJECT_API,
      {
        id : id,
        fieldName : fieldName,
        value : value,
      },
      {observe: 'response'});
  }

  public deleteProject(missionId, projectId){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
      body: {
        missionId: missionId,
        projectId: projectId
      }
    };

    return this._httpClient.delete(AppSettings.PROJECT_API, httpOptions);
  }


}


export interface Project {
  id: number;
  idMission: number;
  title: string;
}

const projects = [
  {
    id: 1,
    idMission: 1,
    title: 'Aide au développement d\'une plateforme logistique'
  },
  {
    id: 2,
    idMission: 1,
    title: 'Architecture de la plateforme'
  }
];
