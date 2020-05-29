import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsCityAutocompleteComponent } from './missions-city-autocomplete.component';

describe('MissionsCityAutocompleteComponent', () => {
  let component: MissionsCityAutocompleteComponent;
  let fixture: ComponentFixture<MissionsCityAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsCityAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsCityAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
