import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecruitmentOfficerComponent } from './new-recruitment-officer.component';

describe('NewRecruitmentOfficerComponent', () => {
  let component: NewRecruitmentOfficerComponent;
  let fixture: ComponentFixture<NewRecruitmentOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRecruitmentOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecruitmentOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
