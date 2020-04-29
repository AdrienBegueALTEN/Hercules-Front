import { StrUtilsService } from './../../_services/str-utils.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

const FIRSTNAME_KEY = 'firstname';
const LASTNAME_KEY = 'lastname';
const EMAIL_KEY = 'email';

@Component({
  selector: 'app-new-consultant',
  templateUrl: './new-consultant.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class NewConsultantComponent implements OnInit {
  grp : FormGroup = new FormBuilder().group({});

  @Output() sendFormGrp = new EventEmitter<FormGroup>();

  constructor(
    private _strUtilsService : StrUtilsService
  ) {}

  ngOnInit() {
    this.sendFormGrp.emit(this.grp);
  }

  addCtrl(key : string, ctrl : FormControl) : void {
    this.grp.addControl(key, ctrl);
  }

  autoCompleteEmail() : void {
    let firstname = this._strUtilsService.normalizeName(this.grp.get(FIRSTNAME_KEY).value);
    let lastname = this._strUtilsService.normalizeName(this.grp.get(LASTNAME_KEY).value);
    let emailLocalPart = (firstname != '') ? 
                  firstname + ((lastname != '') ?
                    '.' + lastname : '') : lastname;
    this.grp.get(EMAIL_KEY).setValue(emailLocalPart + '@alten.com');
  }
}