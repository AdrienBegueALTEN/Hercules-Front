import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MissionService } from 'src/app/_services/mission.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-missions-skills-autocomplete',
  templateUrl: './missions-skills-autocomplete.component.html'
})
export class MissionsSkillsAutocompleteComponent  {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: any[] = [
    'c++',
    'java'
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push(value);
    }

    // Reset the input value
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
