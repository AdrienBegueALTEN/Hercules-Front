import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentOfficerService {

  constructor() { }

  getRecruitmentOfficers(enabled: boolean) : Observable<any[]> {

    return null;

  }
}
