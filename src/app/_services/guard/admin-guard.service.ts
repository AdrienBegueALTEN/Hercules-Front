import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/_enums/role.enum';

/**
 * Guard that checks if the user has the administration rights
 */
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private _authService : AuthService) {}

  /**
   * Checks if the user is admin
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.getUser().roles.includes(Role.ADMIN)) return true;
    else window.location.replace('not-found');
  }
}