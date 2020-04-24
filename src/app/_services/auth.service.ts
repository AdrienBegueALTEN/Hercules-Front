import { AppSettings } from './../app-settings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(credentials) : Observable<any> {
    return this.http.post(AppSettings.AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, AppSettings.HTTP_OPTIONS);
  }

  register(user) : Observable<any> {
    return this.http.post(AppSettings.AUTH_API + 'register', {
      username: user.username,
      email: user.email,
      password: user.password
    }, AppSettings.HTTP_OPTIONS);
  }
}