import { HttpStatus } from './../../_enums/http-status.enum';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultantNewDiplomaComponent } from 'src/app/_form/consultant-new-diploma/consultant-new-diploma.component';
import { Router } from '@angular/router';

const XP_KEY = 'experience';

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html',
  styleUrls: ['./consultant-edit.component.scss']
})
export class ConsultantEditComponent {
  @Input() consultant : any;
  @Input() inMissionView : boolean = false;

  @ViewChild('diplomacontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  private _oldValues : object = {}
  grp : FormGroup = new FormBuilder().group({});

  constructor(
    private _consultantService : ConsultantService,
    private _dialog : MatDialog,
    private _snackBar: MatSnackBar,
    private _resolver: ComponentFactoryResolver,
    private _router: Router
  ) { }

  addCtrl(key : string, ctrl : FormControl) : void {
    this.grp.addControl(key, ctrl);
  }

  valueChange(key : string) : void {
    if (!this._doUpdate(key))
      return;
    const newValue : any = (key === XP_KEY) ? 
      Number(this.grp.controls[key].value) : this.grp.controls[key].value;
    this._consultantService
      .updateConsultant(this.consultant.id, key, newValue).subscribe(
        () => {
          this.consultant[key] = newValue;
          this._oldValues[key] = newValue;
          this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
        },
        error => { this._handleError(error.status); }
      )
  }

  private _doUpdate(key : string) {
    return this.grp.controls[key].valid &&
      this._oldValues[key] != this.grp.controls[key].value;
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

  createComponent(consultantId:number) {
    this.entry.clear();
    const factory = this._resolver.resolveComponentFactory(ConsultantNewDiplomaComponent);
    const componentRef = this.entry.createComponent(factory);
    componentRef.instance.consultantId=consultantId;
  }

  updateManager(manager:any){
    this._consultantService.updateConsultant(this.consultant.id,'manager',manager.id).subscribe(
      () => {
        this.consultant['manager']=manager;
        this._snackBar.open('Mise à jour effectuée', 'x', {duration: 2000});
      },
      (err) => {
        console.log(err);
      }
    )
    this._router.navigateByUrl('/consultants/'+this.consultant.id);
  }
}
