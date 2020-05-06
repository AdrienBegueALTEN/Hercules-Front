import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySectorCustInputComponent } from './activity-sector-cust-input.component';

describe('ActivitySectorCustInputComponent', () => {
  let component: ActivitySectorCustInputComponent;
  let fixture: ComponentFixture<ActivitySectorCustInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySectorCustInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySectorCustInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
