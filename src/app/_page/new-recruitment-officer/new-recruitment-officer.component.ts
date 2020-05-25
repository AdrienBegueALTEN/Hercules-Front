import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { MatDialog } from '@angular/material/dialog';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';

@Component({
  selector: 'app-new-recruitment-officer',
  templateUrl: './new-recruitment-officer.component.html',
  styleUrls: ['./new-recruitment-officer.component.scss']
})
export class NewRecruitmentOfficerComponent implements OnInit {

  recruitmentOfficerForm : FormGroup;


  constructor(private _formBuilder: FormBuilder,
              private _recruitmentOfficerService: RecruitmentOfficerService,
              private _dialog: MatDialog,
              private _router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.recruitmentOfficerForm=this._formBuilder.group({
        firstname: ['',Validators.required],
        lastname: ['',Validators.required],
        email: ['',[Validators.required,Validators.email,this.domainValidator]]
    });
  }
  onSaveRecruitmentOfficer(): void{
      const firstname = this.recruitmentOfficerForm.get('firstname').value;
      const lastname = this.recruitmentOfficerForm.get('lastname').value;
      const email = this.recruitmentOfficerForm.get('email').value;
      this._recruitmentOfficerService.addRecruitmentOfficer(firstname, lastname, email).subscribe(
        (response) => { this._router.navigate(['/recruitment-officers']); },
        () => { this.dialogSaveError(email); }
      );
      
  }

  dialogSaveError(email : String) : void {
    const dialog = this._dialog.open(OkDialogComponent, {
      data: {
        title: "Echec de la création du CDR",
        message: "L'email "+ email + " est déjà utilisé",
        ok: 'Continuer'
      }
    });

    
  }

  domainValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value.indexOf("@alten.com")==-1) {
      return { 'badDomain': true };
    }
    else if (control.value.indexOf(".") >= control.value.indexOf("@")){
      return { 'badDomain' : true};
    }
    return null;
  }

}
