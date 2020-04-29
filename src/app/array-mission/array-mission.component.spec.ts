import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayMissionComponent } from './array-mission.component';

describe('ArrayMissionComponent', () => {
  let component: ArrayMissionComponent;
  let fixture: ComponentFixture<ArrayMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
