import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantDetailsComponent } from './consultant-details.component';

describe('ConsultantDetailsComponent', () => {
  let component: ConsultantDetailsComponent;
  let fixture: ComponentFixture<ConsultantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
