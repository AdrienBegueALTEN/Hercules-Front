import { MissionService } from './../../_services/mission.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OkDialogComponent } from 'src/app/dialog/ok/ok-dialog.component';

const NUMBER_PATTERN = '^\\d*$';

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.scss']
})
export class MissionEditComponent implements OnInit {
  @Input() missionId : number;
  @Input() version : any;

  readonly CITY_KEY = 'city';
  readonly COMMENT_KEY = 'comment';
  readonly CONTRACT_KEY = 'contractType';
  readonly COUNTRY_KEY = 'country';
  readonly DESCRIPTION_KEY = 'description';
  readonly ROLE_KEY = 'consultantRole';
  readonly TEAM_KEY = 'teamSize';
  readonly TITLE_KEY = 'title';
  readonly XP_KEY = 'consultantStartXp';

  grp : FormGroup;

  @Output() update : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _dialog : MatDialog,
    private _missionService : MissionService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.grp = new FormBuilder().group({
      title : [this.version[this.TITLE_KEY], [Validators.maxLength(100)]],
      consultantRole : [this.version[this.ROLE_KEY], [Validators.maxLength(100)]],
      consultantStartXp : [this.version[this.XP_KEY], [Validators.required, Validators.min(0), Validators.pattern(NUMBER_PATTERN)]],
      description : [this.version[this.DESCRIPTION_KEY], [Validators.maxLength(1000)]],
      city : [this.version[this.CITY_KEY], [Validators.maxLength(100)]],
      country : [this.version[this.COUNTRY_KEY], [Validators.maxLength(100)]],
      teamSize : [this.version[this.TEAM_KEY], [Validators.required, Validators.min(1), Validators.pattern(NUMBER_PATTERN)]],
      contractType : [this.version[this.CONTRACT_KEY]],
      comment : [this.version[this.COMMENT_KEY], [Validators.maxLength(255)]],
    })
  }

  public onChange(key : string) : void {
    if (!this._doUpdate(key))
      return;
  const newValue : any = (key === this.TEAM_KEY || key === this.XP_KEY) ? 
    Number(this.grp.controls[key].value) : this.grp.controls[key].value;
  this._missionService
    .updateMission(this.missionId, key, newValue).subscribe(
      () => {
        this._snackBar.open('Mise à jour effectuée', 'X', {duration: 2000});
        this.update.emit({key : key, value : newValue});
      },
      () => { this._handleError(); }
    )
  }

  private _doUpdate(key : string) {
    return this.grp.controls[key].valid && this.grp.controls[key].dirty;
  }

  private _handleError() : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Echec de la modification',
      message : 'Une erreur s\'est produite lors de la tentative de mise à jour',
      ok: 'OK'
    };
    this._dialog.open(OkDialogComponent, dialogConfig);
  }
}
