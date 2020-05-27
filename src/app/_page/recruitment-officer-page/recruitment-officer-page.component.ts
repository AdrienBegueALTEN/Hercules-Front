import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { ActivatedRoute } from '@angular/router';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recruitment-officer-page',
  templateUrl: './recruitment-officer-page.component.html',
  styleUrls: ['./recruitment-officer-page.component.scss']
})
export class RecruitmentOfficerPageComponent implements OnInit {

  recruitmentOfficerForm : FormGroup;
  user;
  isAuthenticated = false;
  recruitmentOfficer : any;
  

  constructor(private _authService : AuthService,
              private _recruitmentOfficerService : RecruitmentOfficerService,
              private _route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _dialog: MatDialog,
              private _snackBar: MatSnackBar) { 
  }

  

  ngOnInit(): void {
    this.initialize();
  }

  initialize() : void {
    this.isAuthenticated = !!this._authService.getToken();

    if(this.isAuthenticated){
      this.user = this._authService.getUser();
    }
    this.recruitmentOfficerForm = this._formBuilder.group({
        firstname: ['',[Validators.required]],
        lastname: ['',[Validators.required]],
        email: ['',[Validators.required,Validators.email,this.domainValidator]],
        releaseDate: ['']
    });
    this._recruitmentOfficerService.getRecruitmentOfficerById(this._route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        this.recruitmentOfficer = data;
        this.recruitmentOfficerForm.get('firstname').setValue(this.recruitmentOfficer.firstname);
        this.recruitmentOfficerForm.get('lastname').setValue(this.recruitmentOfficer.lastname);
        this.recruitmentOfficerForm.get('email').setValue(this.recruitmentOfficer.email);
      },
      (err) => {
        this.dialogBadStart();
      }
    );
    
    
    
  }

  
    
  

  onUpdateRecruitmentOfficer() : void {
    if(!this.recruitmentOfficerForm.controls['firstname'].hasError('required') && 
       !this.recruitmentOfficerForm.controls['lastname'].hasError('required') &&
       !this.recruitmentOfficerForm.controls['email'].hasError('required') &&
       !this.recruitmentOfficerForm.controls['email'].hasError('email') &&
       !this.recruitmentOfficerForm.controls['email'].hasError('badDomain') )
       {
          const firstname = this.recruitmentOfficerForm.get('firstname').value;
          const lastname = this.recruitmentOfficerForm.get('lastname').value;
          const email = this.recruitmentOfficerForm.get('email').value;
          this.recruitmentOfficer.email = email;
          this.recruitmentOfficer.firstname = firstname;
          this.recruitmentOfficer.lastname = lastname;
          this._recruitmentOfficerService.updateRecruitmentOfficer(firstname, lastname, email,this.recruitmentOfficer.id).subscribe(
            (response) => { this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000}); },
            () => { this.dialogError(firstname,lastname); }
          );
    }
    else{
      this.dialogError(this.recruitmentOfficer.firstname,this.recruitmentOfficer.lastname);
    }
  }

  onReleaseRecruitmentOfficer() : void {
    const releaseDate = this.recruitmentOfficerForm.get('releaseDate').value;
    this.recruitmentOfficer.releaseDate = releaseDate;
    this._recruitmentOfficerService.releaseRecruitmentOfficer(releaseDate, this.recruitmentOfficer.id).subscribe(
      (response) => { this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000}); },
      () => { this.dialogError(this.recruitmentOfficer.firstname,this.recruitmentOfficer.lastname); }
    );
  }

  dialogError(firstname : String, lastname : String) : void {
    const dialog = this._dialog.open(OkDialogComponent, {
      data: {
        title: "Echec de changement du chargé de recrutement : "+firstname+" "+lastname,
        message: "Les changements n'ont pas été pris en compte",
        ok: 'Continuer'
      }
    });
  }
  
  dialogBadStart() : void {
    const  dialog = this._dialog.open(MessageDialogComponent, {
      data: "Impossible de charger ce chargé de recrutement"
    });
  }

  dialogUpdated() : void {
      const  dialog = this._dialog.open(MessageDialogComponent, {
        data: "Mise à jour effectuée"
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
 