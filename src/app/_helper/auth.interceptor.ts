import { AuthService } from 'src/app/_services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

const TOKEN_HEADER_KEY = 'Authorization';

/**
 * Class that manages the http requests 
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) { }

  /**
   * Function that takes an http request, modifies its header and returns it as an Observable 
   * @param req http request
   * @param next structure to contain the modified http request
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this._authService.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

/**
 * "provide" field for an http request 
 */
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];