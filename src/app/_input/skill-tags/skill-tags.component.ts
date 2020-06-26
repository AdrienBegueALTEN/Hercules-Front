import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MissionService } from 'src/app/_services/mission.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-skill-tags',
  templateUrl: './skill-tags.component.html'
})
export class SkillTagsComponent implements OnInit {
  @Input() project: any;
  @Input() externalVersion : boolean = false;
  
  visible = true;
  addOnBlur = true;
  allSkills;
  filteredSkills: Observable<any[]>;
  skillCtrl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Output() addSkillEvent = new EventEmitter<any>();
  @Output() removeSkillEvent = new EventEmitter<any>();

  constructor(private _missionService : MissionService) {}

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

  add(event: MatChipInputEvent): void {
    if(this.project.skills.length<10){
      const input = event.input;
      const value = event.value;

      // Add our fruit
      this.addSkill(value);

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
    
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    //this.addSkill(event.option.viewValue)
    this.fruitInput.nativeElement.value = event.option.viewValue;
    //this.skillCtrl.setValue(null);
  }

  remove(skill: any): void {
    const index = this.project.skills.indexOf(skill);
    if (index >= 0) 
      this.project.skills.splice(index, 1);
    this.removeSkillEvent.emit({
      project: this.project.id,
      skill: skill
    })
  }

  private _filter(value: string): string[] {
    
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.label.toLowerCase().includes(filterValue));
  }
}
