import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

const FIRSTNAME_KEY = 'firstname';
const LASTNAME_KEY = 'lastname';
const EMAIL_KEY = 'email';

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html',
  styleUrls: ['./consultant-edit.component.scss']
})
export class ConsultantEditComponent implements OnInit {
  @Input() consultant : any;
  @Input() inMissionView : boolean = false;

  grp : FormGroup = new FormBuilder().group({});

  constructor() { }

  ngOnInit() {
  }

  addCtrl(key : string, ctrl : FormControl) : void {
    this.grp.addControl(key, ctrl);
  }

  valueChange(key : string) : void {
    if (!this.grp.controls[key].valid) return;
  }

}
