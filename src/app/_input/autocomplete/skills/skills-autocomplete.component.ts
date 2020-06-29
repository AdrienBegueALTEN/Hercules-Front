import { Component } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-skills-autocomplete',
  templateUrl: './skills-autocomplete.component.html'
})
export class SkillsAutocompleteComponent  {
  /**
   * The array contains keystrokes that trigger the creation of a new skill
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * Contains all skills
   */
  skills: any[] = [];

  /**
   * Add a skill to the array
   * @param event Mat chip event containign the name of a skill
   */
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

  /**
   * Removes a skill
   * @param skill Skill to remove
   */
  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  /**
   * Get all skills
   * @returns List of skills
   */
  public getSkills(){
    return this.skills;
  }

}
