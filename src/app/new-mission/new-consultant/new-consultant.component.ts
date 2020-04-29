import { StrUtilsService } from './../../_services/str-utils.service';
import { AppSettings } from './../../app-settings';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-consultant',
  templateUrl: './new-consultant.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class NewConsultantComponent implements OnInit {
  grp : FormGroup;

  @Output() sendFormGrp = new EventEmitter<FormGroup>();

  constructor(
    private _strUtilsService : StrUtilsService
  ) {}

  ngOnInit() {
    this.createForm();
    this.sendFormGrp.emit(this.grp);
  }

  createForm() {
    this.grp = new FormBuilder().group({
      'firstname' : ['', [Validators.required, Validators.pattern(AppSettings.NAME_PATTERN)]],
      'lastname' : ['', [Validators.required, Validators.pattern(AppSettings.NAME_PATTERN)]],
      'email' : ['', [Validators.required, Validators.pattern(AppSettings.EMAIL_PATTERN)]]
    });
  }

  getFirstnameErr(): string {
    return  this.grp.get('firstname').hasError('required') ? 'Le prénom doit être renseigné' :
            this.grp.get('firstname').hasError('pattern') ? 'Le prénom ne peut contenir que des lettres, éventuellement séparées pas un espace ou un tiret' : '';
  }

  getLastnameErr(): string {
    return  this.grp.get('lastname').hasError('required') ? 'Le nom doit être renseigné' :
            this.grp.get('lastname').hasError('pattern') ? 'Le nom ne peut contenir que des lettres, éventuellement séparées pas un espace ou un tiret' : '';
  }

  getEmailErr(): string {
    return  this.grp.get('email').hasError('required') ? 'Le email doit être renseignée' :
            this.grp.get('email').hasError('pattern') ? 'Le format du email est incorrect' : '';
  }

  onFirstnameChange() {
    let firstname : string = this.grp.get('firstname').value;
    firstname = firstname.charAt(0).toUpperCase() + firstname.substr(1);
    this.grp.get('firstname').setValue(firstname);
    this._updateEmail();
  }

  onLastnameChange() { this._updateEmail(); }

  private _updateEmail() {
    let firstname = this._strUtilsService.normalizeName(this.grp.get('firstname').value);
    let lastname = this._strUtilsService.normalizeName(this.grp.get('lastname').value);
    let emailLocalPart = (firstname != '') ? 
                  firstname + ((lastname != '') ?
                    '.' + lastname : '') : lastname;
    this.grp.get('email').setValue(emailLocalPart + '@alten.com');
  }
}