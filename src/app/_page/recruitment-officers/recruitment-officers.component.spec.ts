import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentOfficersComponent } from './recruitment-officers.component';

describe('RecruitmentOfficersComponent', () => {
  let component: RecruitmentOfficersComponent;
  let fixture: ComponentFixture<RecruitmentOfficersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentOfficersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
