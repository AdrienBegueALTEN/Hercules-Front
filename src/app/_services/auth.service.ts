import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../_enums/role.enum';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private _httpClient : HttpClient) { }

  public login(credentials) : Observable<any> {
    return this._httpClient.post(AppSettings.AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, AppSettings.HTTP_JSON_CONTENT);
  }

  public changePassword(currentPassword : string, newPassword : string) : Observable<any> {
    return this._httpClient.put(AppSettings.AUTH_API + 'change-password', {
      currentPassword: currentPassword,
      newPassword: newPassword
    }, AppSettings.HTTP_JSON_CONTENT);
  }

  public missionSheetAccess(mission : number) : Observable<any> {
    return this._httpClient.get(AppSettings.AUTH_API + 'mission-sheet-access/' + mission, {responseType: 'blob'});
  }

  public passwordCreationAccess(user : number) : Observable<any> {
    return this._httpClient.get(AppSettings.AUTH_API + 'password-creation-access/' + user, {responseType: 'blob'});
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