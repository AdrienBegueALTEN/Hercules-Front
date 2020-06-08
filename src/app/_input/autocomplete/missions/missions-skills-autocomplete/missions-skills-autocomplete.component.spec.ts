import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsSkillsAutocompleteComponent } from './missions-skills-autocomplete.component';

describe('MissionsSkillsAutocompleteComponent', () => {
  let component: MissionsSkillsAutocompleteComponent;
  let fixture: ComponentFixture<MissionsSkillsAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsSkillsAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsSkillsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
