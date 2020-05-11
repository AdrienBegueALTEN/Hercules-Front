import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSingleEditComponent } from './project-single-edit.component';

describe('ProjectSingleEditComponent', () => {
  let component: ProjectSingleEditComponent;
  let fixture: ComponentFixture<ProjectSingleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSingleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
