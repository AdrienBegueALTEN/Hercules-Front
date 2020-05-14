import { HttpStatus } from './../../_enums/http-status.enum';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html'
})
export class ConsultantEditComponent implements OnInit {
  @Input() consultant : any;

  readonly EMAIL_KEY = 'email';
  readonly FIRSTNAME_KEY = 'firstname';
  readonly LASTNAME_KEY = 'lastname';
  readonly XP_KEY = 'experience';

  showNewDiploma : boolean;
  grp : FormGroup = new FormBuilder().group({});

  @Output() reload = new EventEmitter<any>();

  constructor(
    private _consultantService : ConsultantService,
    private _dialog : MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.showNewDiploma = false;
  }

  addCtrl(key : string, ctrl : FormControl) : void {
    this.grp.addControl(key, ctrl);
  }

  valueChange(key : string) : void {
    if (!this._doUpdate(key))
      return;
    const newValue : any = (key === this.XP_KEY) ? 
      Number(this.grp.controls[key].value) : this.grp.controls[key].value;
    this._consultantService
      .updateConsultant(this.consultant.id, key, newValue).subscribe(
        () => {
          this.consultant[key] = newValue;
          this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
        },
        error => { this._handleError(error.status); }
      )
  }

  private _doUpdate(key : string) {
    return this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }

  private _handleError(status : number) : void {
    let message : string;
    switch(status) {
      case HttpStatus.CONFLICT :
        message = 'Cette adresse mail est indisponible.';
        break;
      default :
        message = 'Impossible de mettre à jour ce champ.';
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Echec de la modification',
      message : message,
      ok: 'OK'
    };
    this._dialog.open(OkDialogComponent, dialogConfig);
  }

  updateManager(manager:any){
    this._consultantService.updateConsultant(this.consultant.id,'manager',manager.id).subscribe(
      () => {
        this.consultant['manager']=manager;
        this._snackBar.open('Mise à jour effectuée', 'x', {duration: 2000});
        this.sendReload();
      },
      (err) => {
        console.log(err);
      }
    )
  }
  
  sendReload() {
    this.ngOnInit();
    this.reload.emit();
  }
}
