/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StrUtilsService } from './str-utils.service';

describe('Service: StrUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrUtilsService]
    });
  });

  it('should ...', inject([StrUtilsService], (service: StrUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
