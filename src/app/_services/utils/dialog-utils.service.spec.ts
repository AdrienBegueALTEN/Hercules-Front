/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DialogUtilsService } from './dialog-utils.service';

describe('Service: DialogUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogUtilsService]
    });
  });

  it('should ...', inject([DialogUtilsService], (service: DialogUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
