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

    /**
     * Creates a new mission
     * @param consultant Consultant ID
     * @param customer Customer ID
     */
  public newMission(consultant : number, customer : number) : Observable<any> {
    return this._httpClient.post(MISSION_API,
      {
        consultant : consultant,
        customer : customer,
      },
    AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Add a new version to the project. The project is linked to the mission
   * @param mission Mission ID
   */
  public addVersion(mission : number) : Observable<any> {
    return this._httpClient.get(MISSION_API.concat() + 'new-version/' + mission);
  }

  /**
   * Get mission informations from its ID
   * @param mission Mission ID
   */
  public getMissionDetails(mission : number) : Observable<any> {
    return this._httpClient.get(MISSION_API + mission);
  }

  public getMissionDetailsFromToken(token : string) : Observable<any> {
    return this._notInteceptedHttpClient.get(MISSION_API + 'anonymous',
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  /**
   * Fetches all validated missions sheets. 
   * If manager ID is present, it also fetches all missions sheets from the manager linked to this ID.
   * Thus, a manager will only see all validated missions form other managers and all of his missions.
   * A recruitement officer won't have a manager ID. Thus, a recruitement officer will only see validated missions sheets.
   * @param manager Manager ID : Optionnal
   */
  public getMissions(manager? : number) : Observable<any> {
    return this._httpClient.get(MISSION_API + (manager ? '?manager=' + manager : ''));
  }

  /**
   * Deletes a mission by its ID. Also deletes all projects and versions linked to this mission
   * @param id Mission ID
   */
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

  /**
   * Creates a new project. The project is linked to the mission ID
   * @param mission Mission ID
   */
  public newProject(mission : number): Observable<any> {
    return this._httpClient.get(MISSION_API + 'new-project/' + mission);
  }

  /**
   * Allows an unauthanticated user to create a new project
   * @param token Token provided to the unauthenticated user
   */
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

  /**
   * Deletes a project from its ID for an authenticated user. Also deletes all versions linked to this ID
   * @param project Project ID
   */
  public deleteProject(project : number){
    return this._httpClient.delete(PROJECT_API + project);
  }

  /**
   * Deletes a project from its ID for an unauthenticated user. Also deletes all versions linked to this ID.
   * The token is used to check if the user is allowed to edit the project
   * @param token Token provided to the unauthenticated user
   * @param project Project ID
   */
  public deleteProjectFromToken(token : string, project : number){
    return this._notInteceptedHttpClient.delete(PROJECT_API + 'anonymous' + project,
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public uploadProjectPicture(file: File, projectId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('blob', file.blob);
    formData.append('name', file.name);

    const req = new HttpRequest('POST', PROJECT_API + projectId + '/upload-picture', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._httpClient.request(req);
  }

  public uploadProjectPictureFromToken(file: File, projectId: number, token: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', PROJECT_API + 'anonymous/' + projectId + '/upload-picture', formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) 
    });

    return this._notInteceptedHttpClient.request(req);
  }

  /**
   * Removes the picture from a project for an authenticated user
   * @param project Project ID
   */
  public removePictureFromProject(project : number): Observable<any> {
    return this._httpClient.delete(
      PROJECT_API + project + '/delete-picture');
  }

  /**
   * Removes the picture from a project for an unauthenticated user. 
   * The token is used to check if the user is allowed to edit the project
   * @param project Project ID
   * @param token Token provided to the unauthenticated user
   */
  public removePictureFromProjectFromToken(project : number, token: string): Observable<any> {
    return this._notInteceptedHttpClient.delete(
      PROJECT_API + 'anonymous/' + project + '/delete-picture',
      { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  /**
   * Add new skills to a project for an authenticated user
   * @param project Project ID
   * @param labels New skills 
   */
  public addSkillToProject(project : number, labels : string[]): Observable<any> {
    return this._httpClient.post(PROJECT_API + project + '/skills',
      labels,
      AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Remove skills from a project for an authenticated user. 
   * @param project Project ID
   * @param skill Skills to remove
   */
  public removeSkillFromProject(project : number, skill : any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: skill
    };
    return this._httpClient.delete(
      PROJECT_API + project + '/skills',
      httpOptions);
  }

  /**
   * Add new skills to a project for an unauthenticated user. 
   * The token is used to check if the user is allowed to edit the project
   * @param project Project ID
   * @param labels New skills
   * @param token Token provided to the unauthenticated user
   */
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

    /**
   * Remove skills from a project for an unauthenticated user. 
   * The token is used to check if the user is allowed to edit the project
   * @param project Project ID
   * @param labels Skills to remove
   * @param token Token provided to the unauthenticated user
   */
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

  /**
   * Gets all skills
   */
  public getAllSkills() : Observable<any> {
    return this._httpClient.get(PROJECT_API + 'skills-all');
  }

  /**
   * Generates a PDF. The PDF contains every element selected by the user in the mission table
   * @param elements Table elements selected by the user
   */
  public generatePDF(elements : any[]) : Observable<any> {
    return this._httpClient.post(MISSION_API + 'pdf',
      elements,
      {responseType: 'blob'});
  }

  /**
   * Fetches all missions matching the criteria entered by the user
   * @param criteria Object containing every criteria requested by the user
   */
  public advancedSearch(criteria : object) : Observable<any> {
    var url : string = MISSION_API + 'advancedSearch/?'
    for (var i in criteria)
      url = url.concat(encodeURIComponent(i), '=', encodeURIComponent(criteria[i]), '&');
    url = url.slice(0, url.length - 1);
    return this._httpClient.get(url);
  }
}