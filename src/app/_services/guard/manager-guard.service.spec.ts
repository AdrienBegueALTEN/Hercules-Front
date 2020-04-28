/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManagerGuard } from './manager-guard.service';

describe('Service: ManagerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerGuard]
    });
  });

  it('should ...', inject([ManagerGuard], (service: ManagerGuard) => {
    expect(service).toBeTruthy();
  }));
});
