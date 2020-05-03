/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XpInputComponent } from './xp-input.component';

describe('XpInputComponent', () => {
  let component: XpInputComponent;
  let fixture: ComponentFixture<XpInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
