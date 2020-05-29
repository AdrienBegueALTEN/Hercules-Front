import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { RecruitmentOfficerService } from 'src/app/_services/recruitment-officer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';

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
              private _snackBar: MatSnackBar,
              private _router: Router) { 
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
        
        
        if(this.recruitmentOfficer.releaseDate!=null){
          this.recruitmentOfficerForm.get('releaseDate').setValue(this.recruitmentOfficer.releaseDate.substr(0,10));
          this.recruitmentOfficerForm.controls['firstname'].disable();
          this.recruitmentOfficerForm.controls['lastname'].disable();
          this.recruitmentOfficerForm.controls['email'].disable();
          
        }
      },
      (err) => {
        this.dialogMessage("Impossible de charger ce chargé de recrutement");
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
            (error) => { if(error.status==409) this.dialogError(firstname,lastname,"L'adresse mail est déjà utilisée.");
                    else this.dialogError(firstname,lastname,"Les changements n'ont pas été pris en compte."); }
          );
    }
    else{
      this.dialogError(this.recruitmentOfficer.firstname,this.recruitmentOfficer.lastname,"Les champs n'ont pas pu être enregistrés, ils sont incomplets ou invalides.");
    }
  }

  onReleaseRecruitmentOfficer() : void {
    const releaseDate = this.recruitmentOfficerForm.get('releaseDate').value;
    this.recruitmentOfficer.releaseDate = releaseDate;
    this._recruitmentOfficerService.releaseRecruitmentOfficer(releaseDate, this.recruitmentOfficer.id).subscribe(
      (response) => { this.ngOnInit();
                      this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000}); },
      () => { this.dialogError(this.recruitmentOfficer.firstname,this.recruitmentOfficer.lastname,"La date de fin d'activité n'a pas été prise en compte."); }
    );
  }

  onDeleteRecruitmentOfficer(id : String) : void {
    this.dialogDelete();
  }

  onActivateRecruitmentOfficer(id : String) : void {
    this.dialogActive();
  }

  dialogError(firstname : String, lastname : String, message : String) : void {
    const dialog = this._dialog.open(OkDialogComponent, {
      data: {
        title: "Echec de changement du chargé de recrutement : "+firstname+" "+lastname,
        message: message,
        ok: 'Continuer'
      }
    });
  }
  
  dialogMessage(message : String) : void {
    const  dialog = this._dialog.open(MessageDialogComponent, {
      data: message
    });
  }

  dialogDelete() : void {
    const dialog = this._dialog.open(YesNoDialogComponent,{
      data:{ 
        title: "Êtes-vous sûr de vouloir supprimer le CDR "+this.recruitmentOfficer.firstname+" "+this.recruitmentOfficer.lastname,
        message: "La suppression sera définitive.",
        yes: "Supprimer",
        no: "Annuler"
      }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this._recruitmentOfficerService.deleteRecruitmentOfficer(this.recruitmentOfficer.id).subscribe(
            () => { this._router.navigate(['/recruitment-officers']);
                },
            (error) => { this.dialogMessage("Le CDR n'a pas pu être supprimé."); }
          );
        }
      }
    );
  }

  dialogActive() : void {
    const dialog = this._dialog.open(YesNoDialogComponent,{
      data:{ 
        title: "Voulez- vous rendre actif le CDR "+this.recruitmentOfficer.firstname+" "+this.recruitmentOfficer.lastname+" ?",
        message: "",
        yes: "Oui",
        no: "Non"
      }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this._recruitmentOfficerService.reviveRecruitmentOfficer(this.recruitmentOfficer.id).subscribe(
            () => { this.recruitmentOfficer.releaseDate=null;
                    this.ngOnInit();
                },
            (error) => { this.dialogMessage("Le CDR n'a pas pu être rendu actif."); }
          );
        }
      }
    );
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
 