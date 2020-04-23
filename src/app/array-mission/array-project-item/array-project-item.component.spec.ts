import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayProjectItemComponent } from './array-project-item.component';

describe('ArrayProjectItemComponent', () => {
  let component: ArrayProjectItemComponent;
  let fixture: ComponentFixture<ArrayProjectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayProjectItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
