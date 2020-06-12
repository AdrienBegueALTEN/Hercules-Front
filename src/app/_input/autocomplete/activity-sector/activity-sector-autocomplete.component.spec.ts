import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySectorAutocompleteComponent } from './activity-sector-autocomplete.component';

describe('MissionsActivitysectorAutocompleteComponent', () => {
  let component: ActivitySectorAutocompleteComponent;
  let fixture: ComponentFixture<ActivitySectorAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySectorAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySectorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
