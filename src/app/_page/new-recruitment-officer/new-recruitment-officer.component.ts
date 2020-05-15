import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';

@Component({
  selector: 'app-new-recruitment-officer',
  templateUrl: './new-recruitment-officer.component.html',
  styleUrls: ['./new-recruitment-officer.component.scss']
})
export class NewRecruitmentOfficerComponent implements OnInit {

  recruitmentOfficerForm : FormGroup;


  constructor(private _formBuilder: FormBuilder,
              private _recruitmentOfficerService: RecruitmentOfficerService,
              private _router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.recruitmentOfficerForm=this._formBuilder.group({
        firstname: ['',Validators.required],
        lastname: ['',Validators.required],
        email: ['',Validators.required]
    });
  }
  onSaveRecruitmentOfficer(): void{
      const firstname = this.recruitmentOfficerForm.get('firstname').value;
      const lastname = this.recruitmentOfficerForm.get('lastname').value;
      const email = this.recruitmentOfficerForm.get('email').value;
      this._recruitmentOfficerService.addRecruitmentOfficer(firstname, lastname, email);
  }

}
