import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../_enums/role.enum';

const API : string  = AppSettings.API_ENDPOINT + 'auth/';
const TOKEN_KEY : string = 'auth-token';
const TOKEN_PREFIX : string = 'Bearer ';
const USER_KEY : string  = 'auth-user';

/**
 * Checks if the user is allowed to do actions
 */

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _notInteceptedHttpClient : HttpClient;

  constructor(
    private _httpBackend: HttpBackend,
    private _httpClient : HttpClient) {
      this._notInteceptedHttpClient = new HttpClient(this._httpBackend);
    }
/**
 * Sends credentials to the API
 * @param credentials User credentials
 */
  public login(credentials) : Observable<any> {
    return this._httpClient.post(API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, AppSettings.HTTP_JSON_CONTENT);
  }

  /**
   * Changes the password of the logged in user
   * @param currentPassword Current password of the logged in user
   * @param newPassword New password requested by the user
   */
  public changePassword(currentPassword : string, newPassword : string) : Observable<any> {
    return this._httpClient.put(API + 'change-password', {
      currentPassword: currentPassword,
      newPassword: newPassword
    }, {observe: 'response'});
  }

  /**
   * Check if the stored token matches the expected token when changing password
   * @param token Token to check
   */
  public checkPasswordTokenValidity(token : string) : Observable<any> {
    return this._notInteceptedHttpClient.get(API + 'change-password-anonymous',
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  public changePasswordAnonymous(token : string, newPassword : string) : Observable<any> {
    return this._notInteceptedHttpClient.put(API + 'change-password-anonymous', newPassword,
    { headers: new HttpHeaders({ Authorization: TOKEN_PREFIX + token }) });
  }

  /**
   * Checks if the mission can be seen by the user
   * @param mission Mission to be accessed
   */
  public missionSheetAccess(mission : number) : Observable<any> {
    return this._httpClient.get(API + 'mission-sheet-access/' + mission, {responseType: 'blob'});
  }

  public passwordCreationAccess(user : number) : Observable<any> {
    return this._httpClient.get(API + 'password-creation-access/' + user, {responseType: 'blob'});
  }

  /**
   * Logs out the user
   */
  public logout() : void {
    window.sessionStorage.clear();
    window.location.replace('login');
  }

  /**
   * Save a new token
   * @param token Token to be saved
   */
  public saveToken(token : string) : void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Gets token stored in the browser
   */
  public getToken() : string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Save an user
   * @param user User to be saved
   */
  public saveUser(user : any) :void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Gets the current user
   */
  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  /**
   * Checks if user is authenticated
   */
  public isAuthentificated() : boolean { return !!this.getToken(); }

  /**
   * True : User is admin
   * False : User isn't admin
   */
  public userIsAdmin() : boolean {
    return this._userHasRole(Role.ADMIN);
  }

  /**
   * Checks if the authenticated user is manager
   */
  public userIsManager() : boolean {
    return this._userHasRole(Role.MANAGER);
  }

  /**
   * Checks if the authenticated user has a specific role
   * @param role Role to check
   */
  private _userHasRole(role : Role) : boolean {
    return !!this.getUser() && this.getUser().roles.includes(role);
  }
}