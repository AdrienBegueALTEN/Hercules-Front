import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsActivitysectorAutocompleteComponent } from './activity-sector-autocomplete.component';

describe('MissionsActivitysectorAutocompleteComponent', () => {
  let component: MissionsActivitysectorAutocompleteComponent;
  let fixture: ComponentFixture<MissionsActivitysectorAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsActivitysectorAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsActivitysectorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
