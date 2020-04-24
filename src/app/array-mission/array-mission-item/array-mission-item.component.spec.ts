import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayMissionItemComponent } from './array-mission-item.component';

describe('ArrayMissionItemComponent', () => {
  let component: ArrayMissionItemComponent;
  let fixture: ComponentFixture<ArrayMissionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayMissionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayMissionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
