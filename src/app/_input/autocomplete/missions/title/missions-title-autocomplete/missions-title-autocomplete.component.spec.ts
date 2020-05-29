import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsTitleAutocompleteComponent } from './missions-title-autocomplete.component';

describe('MissionsTitleAutocompleteComponent', () => {
  let component: MissionsTitleAutocompleteComponent;
  let fixture: ComponentFixture<MissionsTitleAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsTitleAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsTitleAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
