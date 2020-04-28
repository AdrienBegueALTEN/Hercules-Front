import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {

  constructor(private _authService : AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authService.isAuthenticated()) return true;
    else window.location.replace('home');
  }
}
