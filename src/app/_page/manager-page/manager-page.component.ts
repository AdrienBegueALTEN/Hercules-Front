import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ManagerService } from 'src/app/_services/manager.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageDialogComponent } from 'src/app/dialog/message/message-dialog.component';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';

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
              private _snackBar: MatSnackBar) { }

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
        email: ['',[Validators.required,Validators.email,this.domainValidator]]
    });
    this._managerService.getManagerById(this._route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        this.manager = data;
        this.managerForm.get('firstname').setValue(this.manager.firstname);
        this.managerForm.get('lastname').setValue(this.manager.lastname);
        this.managerForm.get('email').setValue(this.manager.email);
      },
      (err) => {
        this.dialogBadStart();
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
          this._managerService.updateManager(firstname, lastname, email,this.manager.id).subscribe(
            (response) => { this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000}); },
            () => { this.dialogError(firstname,lastname); }
          );
    }
    else{
      this.dialogError(this.manager.firstname,this.manager.lastname);
    }
  }

  dialogError(firstname : String, lastname : String) : void {
    const dialog = this._dialog.open(OkDialogComponent, {
      data: {
        title: "Echec de changement du manager : "+firstname+" "+lastname,
        message: "Les changements n'ont pas été pris en compte",
        ok: 'Continuer'
      }
    });
  }
  
  dialogBadStart() : void {
    const  dialog = this._dialog.open(MessageDialogComponent, {
      data: "Impossible de charger ce manager"
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
