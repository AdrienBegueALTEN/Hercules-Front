import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionColumnChoiceComponent } from './mission-column-choice.component';

describe('MissionColumnChoiceComponent', () => {
  let component: MissionColumnChoiceComponent;
  let fixture: ComponentFixture<MissionColumnChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionColumnChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionColumnChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
