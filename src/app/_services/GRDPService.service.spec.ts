/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GRDPService } from './GRDPService.service';

describe('Service: GRDPService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GRDPService]
    });
  });

  it('should ...', inject([GRDPService], (service: GRDPService) => {
    expect(service).toBeTruthy();
  }));
});
