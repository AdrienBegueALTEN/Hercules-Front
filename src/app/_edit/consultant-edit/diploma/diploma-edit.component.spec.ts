import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantDiplomaComponent } from './diploma-edit.component';

describe('ConsultantDiplomaComponent', () => {
  let component: ConsultantDiplomaComponent;
  let fixture: ComponentFixture<ConsultantDiplomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantDiplomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantDiplomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
