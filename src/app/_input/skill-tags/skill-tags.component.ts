import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MissionService } from 'src/app/_services/mission.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

/**
 * Manages the skill tags
 */
@Component({
  selector: 'app-skill-tags',
  templateUrl: './skill-tags.component.html'
})
export class SkillTagsComponent implements OnInit {
  /**
   * Project where the skills are added.
   */
  @Input() project: any;
  /**
   * Boolean to show if the component is part of the page without authentication needed.
   */
  @Input() externalVersion : boolean = false;
  

  /**
   * Array of skills in the database
   */
  allSkills;
  /**
   * Skills filtered by the user input
   */
  filteredSkills: Observable<any[]>;
  /**
   * Skill form control
   */
  skillCtrl = new FormControl();
  /**
   * Sets the separator keys
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Output() addSkillEvent = new EventEmitter<any>();
  @Output() removeSkillEvent = new EventEmitter<any>();

  constructor(private _missionService : MissionService) {}

  /**
   * Initialize the allSkills array.
   */
  ngOnInit(){
    this._missionService.getAllSkills().subscribe(
      (data) => {
        this.allSkills = data.sort((a, b) => (a.label > b.label) ? 1 : -1)
        this.filteredSkills = this.skillCtrl.valueChanges.pipe(
          startWith(''),
          map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
      },
      (err)=>console.log(err)
    );
  }

  /**
   * Add a new skill to the project.
   * @param value New skill name
   */
  addSkill(value){
    let capVal = value.toUpperCase();
    if(capVal!='' && !this.project.skills.map(p => p.label.toUpperCase()).includes(capVal)){
      this.project.skills.push({label:capVal});
      this.addSkillEvent.emit({
        project: this.project.id,
        skill: capVal
      });
    }
    
  }

  /**
   * Get the value of the skill from the HTML chip input annd add it to the project.
   * @param event New skill chip
   */
  add(event: MatChipInputEvent) : void {
    if (this.project.skills.length < 10){
      const input = event.input;
      const value = event.value;
      this.addSkill(value);
      if (input) input.value = '';
    }
  }

  /**
   * Add the selected element from the autocomplete to the HTML input.
   * @param event Autocomplete selected value
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.skillInput.nativeElement.value = event.option.viewValue;
  }


  /**
   * Removes a skill
   * @param skill Skill to be removed
   */
  remove(skill: any): void {
    const index = this.project.skills.indexOf(skill);
    if (index >= 0) 
      this.project.skills.splice(index, 1);
    this.removeSkillEvent.emit({
      project: this.project.id,
      skill: skill
    })
  }

  /**
   * Filters a skill by the value entered by the user
   * @param value String entered by the user
   */
  private _filter(value: string): string[] {
    
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.label.toLowerCase().includes(filterValue));
  }
}
