import { AppSettings } from './../../app-settings';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-consultant',
  templateUrl: './new-consultant.component.html',
  styleUrls: ['../new-mission.component.scss']
})
export class NewConsultantComponent implements OnInit {
  formGrp : FormGroup;
  @Output() dirtyValues = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit() {
    this.createForm();
    this.onKeyDown();
  }

  createForm() {
    this.formGrp = new FormBuilder().group({
      'firstname' : ['', [Validators.required]],
      'lastname' : ['', [Validators.required]],
      'email' : ['', [Validators.required, Validators.pattern(AppSettings.EMAIL_PATTERN)]],
      'xp' : [0, [Validators.required, Validators.min(0)]]
    });
  }

  getFirstnameErr(): string {
    return  this.formGrp.get('firstname').hasError('required') ? 'Prénom obligatoire' :
            this.formGrp.get('firstname').hasError('pattern') ? 'Format du prénom invalide' : '';
  }

  getLastnameErr(): string {
    return  this.formGrp.get('lastname').hasError('required') ? 'Nom obligatoire' :
            this.formGrp.get('lastname').hasError('pattern') ? 'Format du nom invalide' : '';
  }

  getEmailErr(): string {
    return  this.formGrp.get('email').hasError('required') ? 'Email obligatoire' :
            this.formGrp.get('email').hasError('pattern') ? 'Format du email invalide' : '';
  }

  getXpErr(): string {
    return  this.formGrp.get('xp').hasError('required') ? 'Nombre d\'année d\'expérience obligatoire' :
            this.formGrp.get('xp').hasError('min') ? 'Le nombre d\'années d\'expéricence doit être positif' : '';
  }

  onKeyDown() { this.dirtyValues.emit(this.formGrp); }
}