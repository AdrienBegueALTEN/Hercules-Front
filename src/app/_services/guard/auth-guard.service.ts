import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

/**
 * Guard that checks if the user is authentified
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private _authService : AuthService) {}

  /**
   * Checks if the user is authentified
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthentificated()) return true;
    else window.location.replace('login');
  }
}
