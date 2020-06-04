import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDateDialogComponent } from './release-date-dialog.component';

describe('ReleaseDateDialogComponent', () => {
  let component: ReleaseDateDialogComponent;
  let fixture: ComponentFixture<ReleaseDateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseDateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
