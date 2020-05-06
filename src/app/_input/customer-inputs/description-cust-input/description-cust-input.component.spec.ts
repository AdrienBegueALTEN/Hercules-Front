import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionCustInputComponent } from './description-cust-input.component';

describe('DescriptionCustInputComponent', () => {
  let component: DescriptionCustInputComponent;
  let fixture: ComponentFixture<DescriptionCustInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionCustInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionCustInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
