/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MissionViewInfosComponent } from './mission-view-infos.component';

describe('MissionViewInfosComponent', () => {
  let component: MissionViewInfosComponent;
  let fixture: ComponentFixture<MissionViewInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionViewInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionViewInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
