import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewManagerComponent } from './new-manager.component';

describe('NewManagerComponent', () => {
  let component: NewManagerComponent;
  let fixture: ComponentFixture<NewManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
