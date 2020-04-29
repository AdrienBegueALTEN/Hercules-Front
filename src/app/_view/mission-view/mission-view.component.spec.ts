/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MissionViewComponent } from './mission-view.component';

describe('MissionViewComponent', () => {
  let component: MissionViewComponent;
  let fixture: ComponentFixture<MissionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
