/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsultantServiceService } from './consultant-service.service';

describe('Service: ConsultantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultantServiceService]
    });
  });

  it('should ...', inject([ConsultantServiceService], (service: ConsultantServiceService) => {
    expect(service).toBeTruthy();
  }));
});
