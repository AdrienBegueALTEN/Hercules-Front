import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/_services/manager.service';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-manager',
  templateUrl: './new-manager.component.html',
  styleUrls: ['./new-manager.component.scss']
})
export class NewManagerComponent implements OnInit {

  managerForm : FormGroup;

  constructor(private _formBuilder : FormBuilder,
              private _router : Router,
              private _managerService : ManagerService,
              private _dialog : MatDialog) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() : void {
    this.managerForm = this._formBuilder.group({
      firstname : ['',Validators.required],
      lastname : ['',Validators.required],
      email : ['',[Validators.required,Validators.email,this.domainValidator]],
      admin : ['']
    });

  }

  onSaveManager() : void {
    const firstname = this.managerForm.get('firstname').value;
    const lastname = this.managerForm.get('lastname').value;
    const email = this.managerForm.get('email').value;
    const admin = this.managerForm.get('admin').value;
    this._managerService.addManager(email,firstname,lastname,admin).subscribe(
      (response) => { this._router.navigate(['/managers']); },
      () => { this.dialogSaveError(email);}
    );
  }

  dialogSaveError(email : String) : void {
    const dialog = this._dialog.open(OkDialogComponent, {
      data: {
        title: "Echec de la création du manager",
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
