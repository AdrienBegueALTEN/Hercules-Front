/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MissionSheetPageComponent } from './mission-sheet-page.component';

describe('MissionSheetPageComponent', () => {
  let component: MissionSheetPageComponent;
  let fixture: ComponentFixture<MissionSheetPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionSheetPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionSheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
