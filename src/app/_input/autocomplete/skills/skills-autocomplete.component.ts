import { Component } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-skills-autocomplete',
  templateUrl: './skills-autocomplete.component.html'
})
export class SkillsAutocompleteComponent  {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: any[] = [
    'c++',
    'java'
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.skills.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  public getSkills(){
    return this.skills;
  }

}
