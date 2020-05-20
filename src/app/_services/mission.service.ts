import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { Observable } from 'rxjs';
import { HttpClient, HttpBackend, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';

const TOKEN_PREFIX : string = 'Bearer ';

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
    return this._httpClient.post(AppSettings.MISSION_API,
      {
        consultant : consultant,
        customer : customer,
      },
    AppSettings.HTTP_JSON_CONTENT);
  }

  public addVersion(mission : number) : Observable<any> {
    return this._httpClient.get(AppSettings.MISSION_API + 'new-version/' + mission);
  }

  public getMissionDetails(mission : number) : Observable<any> {
    return this._httpClient.get(AppSettings.MISSION_API + mission);
  }

  public getMissionDetailsFromToken(token : string) : Observable<any> {
    return this._notInteceptedHttpClient.get(AppSettings.MISSION_API + 'from-token',
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public getMissions(manager? : number) : Observable<any> {
    return this._httpClient.get(AppSettings.MISSION_API + (manager ? '?manager=' + manager : ''));
  }

  public updateMission(id : number, fieldName : String, value : any) : Observable<any> {
    return this._httpClient.put(AppSettings.MISSION_API,
      {
        id : id,
        fieldName : fieldName,
        value : value,
      },
      AppSettings.HTTP_JSON_CONTENT);
  }

  public updateMissionFromToken(token : string, fieldName : String, value : any) : Observable<any> {
    return this._notInteceptedHttpClient.put(AppSettings.MISSION_API + 'from-token',
      {
        fieldName : fieldName,
        value : value,
      },
      { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public downloadEmailAccess(mission : number) : Observable<any> {
    return this._httpClient.get(AppSettings.MISSION_API + 'email-access/' + mission, {responseType: 'blob'});
  }

  public newProject(mission : number): Observable<any> {
    return this._httpClient.get(AppSettings.MISSION_API + 'new-project/' + mission);
  }

  public newProjectFromToken(token : string): Observable<any> {
    return this._notInteceptedHttpClient.get(AppSettings.MISSION_API + 'new-project-from-token',
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public updateProject(id : number, fieldName : String, value : any) : Observable<any> {
    return this._httpClient.put(AppSettings.MISSION_API + 'projects',
      {
        id : id,
        fieldName : fieldName,
        value : value,
      },
      AppSettings.HTTP_JSON_CONTENT);
  }

  public updateProjectFromToken(token : string, id : number, fieldName : String, value : any) : Observable<any> {
    return this._notInteceptedHttpClient.put(AppSettings.MISSION_API + 'projects/from-token',
      {
        id : id,
        fieldName : fieldName,
        value : value,
      },
      { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public deleteProject(project : number){
    return this._httpClient.delete(AppSettings.MISSION_API + 'projects/' + project);
  }

  public deleteProjectFromToken(token : string, project : number){
    return this._notInteceptedHttpClient.delete(AppSettings.MISSION_API + 'projects/from-token/' + project,
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  upload(file: File, projectId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', AppSettings.MISSION_API + "projects/" + projectId + '/upload-picture', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._httpClient.request(req);
  }

  uploadFromToken(file: File, projectId: number, token: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', AppSettings.MISSION_API + "projects/from-token/" + projectId + '/upload-picture', formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) 
    });

    return this._notInteceptedHttpClient.request(req);
  }
}