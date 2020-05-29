import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsCustomerAutocompleteComponent } from './missions-customer-autocomplete.component';

describe('MissionsCustomerAutocompleteComponent', () => {
  let component: MissionsCustomerAutocompleteComponent;
  let fixture: ComponentFixture<MissionsCustomerAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsCustomerAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsCustomerAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
