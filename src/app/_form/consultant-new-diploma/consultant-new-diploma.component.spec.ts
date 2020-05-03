import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantNewDiplomaComponent } from './consultant-new-diploma.component';

describe('ConsultantNewDiplomaComponent', () => {
  let component: ConsultantNewDiplomaComponent;
  let fixture: ComponentFixture<ConsultantNewDiplomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantNewDiplomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantNewDiplomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
