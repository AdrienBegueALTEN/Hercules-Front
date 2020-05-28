import { Component, Input, OnInit} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-skill-tags',
  templateUrl: './skill-tags.component.html',
  styleUrls: ['./skill-tags.component.scss']
})
export class SkillTagsComponent implements OnInit {
  @Input() project: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(){
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.project.skills.push({label:value.trim()});
      //this.project.skills.map(skill => skill.label);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.project.skills.indexOf(fruit);

    if (index >= 0) {
      this.project.skills.splice(index, 1);
    }
  }
}
