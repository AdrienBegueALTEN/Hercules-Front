/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoAuthGuard } from './no-auth-guard.service';

describe('Service: NoAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoAuthGuard]
    });
  });

  it('should ...', inject([NoAuthGuard], (service: NoAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
