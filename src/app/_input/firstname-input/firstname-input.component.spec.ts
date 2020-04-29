/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FirstnameInputComponent } from './firstname-input.component';

describe('FirstnameInputComponent', () => {
  let component: FirstnameInputComponent;
  let fixture: ComponentFixture<FirstnameInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstnameInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstnameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
