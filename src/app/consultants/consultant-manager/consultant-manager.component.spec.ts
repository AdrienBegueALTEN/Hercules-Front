import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantManagerComponent } from './consultant-manager.component';

describe('ConsultantManagerComponent', () => {
  let component: ConsultantManagerComponent;
  let fixture: ComponentFixture<ConsultantManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
