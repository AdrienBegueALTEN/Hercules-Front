import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSingleViewComponent } from './project-single-view.component';

describe('ProjectSingleViewComponent', () => {
  let component: ProjectSingleViewComponent;
  let fixture: ComponentFixture<ProjectSingleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSingleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
