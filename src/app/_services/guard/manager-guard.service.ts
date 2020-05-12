import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { Role } from 'src/app/_enums/role.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(private _authService : AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.getUser().roles.includes(Role.MANAGER)) return true;
    else window.location.replace('not-found');
  }
}
