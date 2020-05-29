import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ManagerService } from 'src/app/_services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {

  managerForm : FormGroup;
  user;
  isAuthenticated = false;
  manager : any;

  constructor(private _authService : AuthService,
              private _managerService : ManagerService,
              private _route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private _router: Router) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() : void {
    this.isAuthenticated = !!this._authService.getToken();

    if(this.isAuthenticated){
      this.user = this._authService.getUser();
    }
    this.managerForm = this._formBuilder.group({
        firstname: ['',[Validators.required]],
        lastname: ['',[Validators.required]],
        email: ['',[Validators.required,Validators.email,this.domainValidator]],
        admin : ['',Validators.required],
        releaseDate : ['']
    });
    this._managerService.getManagerById(this._route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        this.manager = data;
        this.managerForm.get('firstname').setValue(this.manager.firstname);
        this.managerForm.get('lastname').setValue(this.manager.lastname);
        this.managerForm.get('email').setValue(this.manager.email);
        this.managerForm.get('admin').setValue(this.manager.admin);
        this.managerForm.controls['admin'].enable();
        
        if(this.manager.releaseDate!=null){
          this.managerForm.get('releaseDate').setValue(this.manager.releaseDate.substr(0,10));
          this.managerForm.controls['firstname'].disable();
          this.managerForm.controls['lastname'].disable();
          this.managerForm.controls['email'].disable();
          this.managerForm.controls['admin'].disable();
        }
      },
      (err) => {
        this.dialogMessage("Impossible de charger ce manager");
      }
    );
    
    
    
  }

  onUpdateManager() : void {
    if(!this.managerForm.controls['firstname'].hasError('required') && 
       !this.managerForm.controls['lastname'].hasError('required') &&
       !this.managerForm.controls['email'].hasError('required') &&
       !this.managerForm.controls['email'].hasError('email') &&
       !this.managerForm.controls['email'].hasError('badDomain') )
       {
          const firstname = this.managerForm.get('firstname').value;
          const lastname = this.managerForm.get('lastname').value;
          const email = this.managerForm.get('email').value;
          const admin = this.managerForm.get('admin').value;
          this.manager.email = email;
          this.manager.firstname = firstname;
          this.manager.lastname = lastname;
          this.manager.admin = admin;
          this._managerService.updateManager(firstname, lastname, email, admin, this.manager.id).subscribe(
            (response) => { this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000}); },
            (error) => { if(error.status==409) this.dialogError(firstname,lastname,"L'adresse mail est déjà utilisée.");
                         else this.dialogError(firstname,lastname,"Les changements n'ont pas été pris en compte."); }
          );
    }
    else{
      this.dialogError(this.manager.firstname,this.manager.lastname,"Les champs n'ont pas pu être enregistrés, ils sont incomplets ou invalides.");
    }
  }

  onDeleteManager(id : String) : void {
    this.dialogDelete();
    
  }

  onReleaseManager() : void {
    const releaseDate = this.managerForm.get('releaseDate').value;
    this.manager.releaseDate = releaseDate;
    this._managerService.releaseManager(releaseDate, this.manager.id).subscribe(
      (response) => { this.ngOnInit();
                      this._managerService.updateManager(this.manager.firstname, this.manager.lastname, this.manager.email, "false", this.manager.id).subscribe(
                        (response) => { this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000}); },
                        () => { this.dialogError(this.manager.firstname,this.manager.lastname,"Les droits d'administrateurs n'ont pas pu être enlevés."); }
                      );
                      this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000}); },
      () => { this.dialogError(this.manager.firstname,this.manager.lastname,"La date de fin d'activité n'a pas été prise en compte."); }
    );
  }

  onActivateManager(id : String) : void {
    this.dialogActive();
  }

  dialogError(firstname : String, lastname : String, message : String) : void {
    const dialog = this._dialog.open(OkDialogComponent, {
      data: {
        title: "Echec de changement du manager : "+firstname+" "+lastname,
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
        title: "Êtes-vous sûr de vouloir supprimer le manager "+this.manager.firstname+" "+this.manager.lastname+" ?",
        message: "La suppression sera définitive.",
        yes: "Supprimer",
        no: "Annuler"
      }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this._managerService.deleteManager(this.manager.id).subscribe(
            () => { this._router.navigate(['/managers']);
                },
            (error) => { this.dialogMessage("Le manager n'a pas pu être supprimé."); }
          );
        }
      }
    );
  }

  dialogActive() : void {
    const dialog = this._dialog.open(YesNoDialogComponent,{
      data:{ 
        title: "Voulez- vous rendre actif le manager "+this.manager.firstname+" "+this.manager.lastname+" ?",
        message: "",
        yes: "Oui",
        no: "Non"
      }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this._managerService.reviveManager(this.manager.id).subscribe(
            () => { this.manager.releaseDate = null;
                    this.ngOnInit();
                },
            (error) => { this.dialogMessage("Le manager n'a pas pu être rendu actif."); }
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
