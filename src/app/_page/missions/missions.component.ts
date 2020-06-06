import { ConsultantService } from 'src/app/_services/consultant.service';
import { MissionService } from 'src/app/_services/mission.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/_dialog/yes-no/yes-no-dialog.component';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {

  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;

  missions: any[];
  consultants: any[];
  public consultantForm : FormControl;
  advancedSearchEnabled = false;


  constructor(
    private _missionService: MissionService,
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _consultantService : ConsultantService
  ) { }

  ngOnInit(): void {

    const user = this._authService.getUser();

    this._missionService.getMissions(user.id).subscribe(
      (data) => {
        this.missions = data;
      },
      (err) => {
        console.log(err);
      }
    )

    this._consultantService.getConsultants(false).subscribe(
      (consultants) => {
        this.consultants = consultants;
      },
      () => window.location.replace('')
    )


  }
  openDeleteDialog(mission: any): void {
    const dialog = this._dialog.open(YesNoDialogComponent, {
      data: {
        title: 'Supprimer la mission ' + mission.lastVersion.title + ' chez ' + mission.customer.name + '.',
        message: 'Voulez-vous continuer ?',
        yes: 'Supprimer la mission',
        no: 'Annuler'
      },
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.delete(mission);
        }
      }
    );
  }

  delete(mission: any) {
    this._missionService.deleteMission(mission.id).subscribe(
      () => {
        this.missions = this.missions.filter((m) => m.id !== mission.id);
        this.arrayView.createDatasource(this.missions);
      },
      (err) => { }
    )
  }

  advancedSearch(){
    this.advancedSearchEnabled = !this.advancedSearchEnabled;
  }
}
