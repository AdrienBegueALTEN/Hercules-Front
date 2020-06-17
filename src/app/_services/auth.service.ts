import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../_enums/role.enum';

const API : string  = AppSettings.API_ENDPOINT + 'auth/';
const TOKEN_KEY : string = 'auth-token';
const TOKEN_PREFIX : string = 'Bearer ';
const USER_KEY : string  = 'auth-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _notInteceptedHttpClient : HttpClient;

  constructor(
    private _httpBackend: HttpBackend,
    private _httpClient : HttpClient) {
      this._notInteceptedHttpClient = new HttpClient(this._httpBackend);
    }

  public login(credentials) : Observable<any> {
    return this._httpClient.post(API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, AppSettings.HTTP_JSON_CONTENT);
  }

  public changePassword(currentPassword : string, newPassword : string) : Observable<any> {
    return this._httpClient.put(API + 'change-password', {
      currentPassword: currentPassword,
      newPassword: newPassword
    }, {observe: 'response'});
  }

  public checkPasswordTokenValidity(token : string) : Observable<any> {
    return this._notInteceptedHttpClient.get(API + 'change-password-anonymous',
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public changePasswordAnonymous(token : string, newPassword : string) : Observable<any> {
    return this._notInteceptedHttpClient.put(API + 'change-password-anonymous', newPassword,
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public missionSheetAccess(mission : number) : Observable<any> {
    return this._httpClient.get(API + 'mission-sheet-access/' + mission, {responseType: 'blob'});
  }

  public passwordCreationAccess(user : number) : Observable<any> {
    return this._httpClient.get(API + 'password-creation-access/' + user, {responseType: 'blob'});
  }

  public logout() : void {
    window.sessionStorage.clear();
    window.location.replace('login');
  }

  public saveToken(token : string) : void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() : string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user : any) :void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public isAuthenticated() : boolean { return !!this.getToken(); }

  public userIsAdmin() : boolean {
    return this._userHasRole(Role.ADMIN);
  }

  public userIsManager() : boolean {
    return this._userHasRole(Role.MANAGER);
  }

  private _userHasRole(role : Role) : boolean {
    return !!this.getUser() && this.getUser().roles.includes(role);
  }
}