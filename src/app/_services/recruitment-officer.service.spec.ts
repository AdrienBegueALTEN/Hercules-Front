import { TestBed } from '@angular/core/testing';

import { RecruitmentOfficerService } from './recruitment-officer.service';

describe('RecruitmentOfficerService', () => {
  let service: RecruitmentOfficerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruitmentOfficerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
