import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Role } from 'src/app/_enums/role.enum';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/dialog/yes-no/yes-no-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from 'src/app/_services/mission.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {

  
  missions:any[];
  


  constructor(
    private _missionService : MissionService
  ) {}

  ngOnInit(): void {

    this._missionService.getMissions().subscribe(
      (data) => {
        this.missions = data;
        
      },
      (err) => {
        console.log(err);
      }
    )
   

  }



}
