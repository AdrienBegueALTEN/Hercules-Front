import {Observable, Subject, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private _http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return of(projects);
  }

  newProject(mission:number): Observable<any>{
    return this._http.post(AppSettings.PROJECT_API,{missionId:mission},AppSettings.HTTP_JSON_CONTENT);
  }

  updateproject(id : number, fieldName : String, value : any) : Observable<any> {
    return this._http.put(AppSettings.PROJECT_API,
      {
        id : id,
        fieldName : fieldName,
        value : value,
      },
      {observe: 'response'});
  }

  deleteProject(missionId, projectId){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
      body: {
        missionId: missionId,
        projectId: projectId
      }
    };

    return this._http.delete(AppSettings.PROJECT_API, httpOptions);
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
