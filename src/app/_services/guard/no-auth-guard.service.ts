import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {

  constructor(private _authService : AuthService) {}

  /**
   * Checks if the user isn't authentified
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authService.isAuthentificated()) return true;
    else window.location.replace('');
  }
}
