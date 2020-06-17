import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { Observable } from 'rxjs';
import { HttpClient, HttpBackend, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';

const TOKEN_PREFIX : string = 'Bearer ';
const MISSION_API : string = AppSettings.API_ENDPOINT + 'missions/';
const PROJECT_API : string = MISSION_API + 'projects/';

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

  public newMission(consultant : number, customer : number) : Observable<any> {
    return this._httpClient.post(MISSION_API,
      {
        consultant : consultant,
        customer : customer,
      },
    AppSettings.HTTP_JSON_CONTENT);
  }

  public addVersion(mission : number) : Observable<any> {
    return this._httpClient.get(MISSION_API.concat() + 'new-version/' + mission);
  }

  public getMissionDetails(mission : number) : Observable<any> {
    return this._httpClient.get(MISSION_API + mission);
  }

  public getMissionDetailsFromToken(token : string) : Observable<any> {
    return this._notInteceptedHttpClient.get(MISSION_API + 'anonymous',
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public getMissions(manager? : number) : Observable<any> {
    return this._httpClient.get(MISSION_API + (manager ? '?manager=' + manager : ''));
  }

  public deleteMission(id : number) : Observable<any> {
    return this._httpClient.delete(MISSION_API + id);
  }

  public updateMission(id : number, fieldname : String, value : any) : Observable<any> {
    return this._httpClient.put(MISSION_API,
      {
        id : id,
        fieldname : fieldname,
        value : value,
      },
      AppSettings.HTTP_JSON_CONTENT);
  }

  public updateMissionFromToken(token : string, fieldname : String, value : any) : Observable<any> {
    return this._notInteceptedHttpClient.put(MISSION_API + 'anonymous',
      {
        fieldname : fieldname,
        value : value,
      },
      { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public newProject(mission : number): Observable<any> {
    return this._httpClient.get(MISSION_API + 'new-project/' + mission);
  }

  public newProjectFromToken(token : string): Observable<any> {
    return this._notInteceptedHttpClient.get(MISSION_API + 'new-project-anonymous',
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public updateProject(id : number, fieldname : String, value : any) : Observable<any> {
    return this._httpClient.put(PROJECT_API,
      {
        id : id,
        fieldname : fieldname,
        value : value,
      },
      AppSettings.HTTP_JSON_CONTENT);
  }

  public updateProjectFromToken(token : string, id : number, fieldname : String, value : any) : Observable<any> {
    return this._notInteceptedHttpClient.put(PROJECT_API + 'anonymous',
      {
        id : id,
        fieldname : fieldname,
        value : value,
      },
      { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public deleteProject(project : number){
    return this._httpClient.delete(PROJECT_API + project);
  }

  public deleteProjectFromToken(token : string, project : number){
    return this._notInteceptedHttpClient.delete(PROJECT_API + 'anonymous' + project,
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public upload(file: File, projectId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', PROJECT_API + projectId + '/upload-picture', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._httpClient.request(req);
  }

  public uploadFromToken(file: File, projectId: number, token: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', PROJECT_API + 'anonymous/' + projectId + '/upload-picture', formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) 
    });

    return this._notInteceptedHttpClient.request(req);
  }

  public removePictureFromProject(project : number): Observable<any> {
    return this._httpClient.delete(
      PROJECT_API + project + '/delete-picture');
  }

  public removePictureFromProjectFromToken(project : number, token: string): Observable<any> {
    return this._notInteceptedHttpClient.delete(
      PROJECT_API + 'anonymous/' + project + '/delete-picture',
      { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public addSkillToProject(project : number, labels : string[]): Observable<any> {
    return this._httpClient.post(PROJECT_API + project + '/skills',
      labels,
      AppSettings.HTTP_JSON_CONTENT);
  }

  public removeSkillFromProject(project : number, skill : any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: skill
    };
    return this._httpClient.delete(
      PROJECT_API + project + '/skills',
      httpOptions);
  }

  public addSkillToProjectFromToken(project : number, labels : string[], token : string): Observable<any> {
    return this._notInteceptedHttpClient.post(PROJECT_API + 'anonymous/' + project + '/skills',
      labels,
      {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': TOKEN_PREFIX + token
        })
      });
  }

  public removeSkillFromProjectFromToken(project : number, skill : any, token : string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': TOKEN_PREFIX + token
      }), body: skill
    };
    { headers: new HttpHeaders({ }) }
    return this._notInteceptedHttpClient.delete(
      PROJECT_API + 'anonymous/' + project + '/skills',
      httpOptions);
  }

  public getAllSkills() : Observable<any> {
    return this._httpClient.get(PROJECT_API + 'skills-all');
  }

  public generatePDF(elements : any[]) : Observable<any> {
    return this._httpClient.post(MISSION_API + 'pdf',
      elements,
      {responseType: 'blob'});
  }

  public advancedSearch(criteria : object) : Observable<any> {
    var url : string = MISSION_API + 'advancedSearch/?'
    for (var i in criteria)
      url = url.concat(encodeURIComponent(i), '=', encodeURIComponent(criteria[i]), '&');
    url = url.slice(0, url.length - 1);
    return this._httpClient.get(url);
  }
}