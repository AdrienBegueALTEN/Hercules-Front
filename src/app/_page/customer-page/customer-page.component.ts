import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Role } from 'src/app/_enums/role.enum';
import { ArrayMissionsViewComponent } from 'src/app/_view/array-missions-view/array-missions-view.component';
import { YesNoDialogComponent } from 'src/app/_dialog/yes-no/yes-no-dialog.component';
import { MissionService } from 'src/app/_services/mission.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent implements OnInit {
  @ViewChild(ArrayMissionsViewComponent) arrayView: ArrayMissionsViewComponent;
  customer: any;
  writingRights : boolean = false;
  missions: any[];
  cols: string[] = ['select', 'title', 'consultant', 'customer', 'city', 'manager', 'numberOfProjects', 'sheetStatus'];

  constructor(private _route: ActivatedRoute,
    private _customerService: CustomerService,
    private _authService: AuthService,
    private _missionService: MissionService,
    private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    const id : number = this._route.snapshot.params['id'];
    this._customerService.getById(id).subscribe(
      (data) => {
        this.customer = data;
        this.getMissions();
        const user = this._authService.getUser();
        this.writingRights = user.roles.includes(Role.MANAGER);
      },
      (err) => {
        window.location.replace('not-found')
      }
    )
  }

  getMissions(){
    this._customerService.getMissionByCustomer(this.customer.id).subscribe(
      (data) => {
        this.missions = data;
      },
      (err) => {}
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

}
