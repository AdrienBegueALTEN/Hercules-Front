import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsCountryAutocompleteComponent } from './missions-country-autocomplete.component';

describe('MissionsCountryAutocompleteComponent', () => {
  let component: MissionsCountryAutocompleteComponent;
  let fixture: ComponentFixture<MissionsCountryAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsCountryAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsCountryAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
