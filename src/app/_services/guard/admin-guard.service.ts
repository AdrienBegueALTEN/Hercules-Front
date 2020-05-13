import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/_enums/role.enum';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private _authService : AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.getUser().roles.includes(Role.ADMIN)) return true;
    else window.location.replace('not-found');
  }
}