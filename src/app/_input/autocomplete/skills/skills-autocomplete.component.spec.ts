import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAutocompleteComponent } from './skills-autocomplete.component';

describe('SkillsAutocompleteComponent', () => {
  let component: SkillsAutocompleteComponent;
  let fixture: ComponentFixture<SkillsAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
