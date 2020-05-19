import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentOfficerPageComponent } from './recruitment-officer-page.component';

describe('RecruitmentOfficerPageComponent', () => {
  let component: RecruitmentOfficerPageComponent;
  let fixture: ComponentFixture<RecruitmentOfficerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentOfficerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentOfficerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
