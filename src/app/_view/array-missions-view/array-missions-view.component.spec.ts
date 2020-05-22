import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayMissionsViewComponent } from './array-missions-view.component';

describe('ArrayMissionsViewComponent', () => {
  let component: ArrayMissionsViewComponent;
  let fixture: ComponentFixture<ArrayMissionsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayMissionsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayMissionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
