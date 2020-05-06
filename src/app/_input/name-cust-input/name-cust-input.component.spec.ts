import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCustInputComponent } from './name-cust-input.component';

describe('NameCustInputComponent', () => {
  let component: NameCustInputComponent;
  let fixture: ComponentFixture<NameCustInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameCustInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCustInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
