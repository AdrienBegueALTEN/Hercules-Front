import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCustInputComponent } from './logo-cust-input.component';

describe('LogoCustInputComponent', () => {
  let component: LogoCustInputComponent;
  let fixture: ComponentFixture<LogoCustInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoCustInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoCustInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
