import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFilenameDialogComponent } from './choose-filename-dialog.component';

describe('ChooseFilenameDialogComponent', () => {
  let component: ChooseFilenameDialogComponent;
  let fixture: ComponentFixture<ChooseFilenameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseFilenameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFilenameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
