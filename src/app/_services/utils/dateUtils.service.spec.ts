/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DateUtilsService } from './dateUtils.service';

describe('Service: DateUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateUtilsService]
    });
  });

  it('should ...', inject([DateUtilsService], (service: DateUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
