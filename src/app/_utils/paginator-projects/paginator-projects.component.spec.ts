import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorProjectsComponent } from './paginator-projects.component';

describe('PaginatorProjectsComponent', () => {
  let component: PaginatorProjectsComponent;
  let fixture: ComponentFixture<PaginatorProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
