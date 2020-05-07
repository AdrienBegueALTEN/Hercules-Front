import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Role } from 'src/app/_enums/role.enum';

@Component({
  selector: 'app-consultant-page',
  templateUrl: './consultant-page.component.html',
  styleUrls: ['./consultant-page.component.scss']
})
export class ConsultantPageComponent implements OnInit {
  consultant : any;
  writingRights : boolean = false;

  constructor(
    private _authService : AuthService,
    private _consultantService : ConsultantService,
    private _route : ActivatedRoute,
    private _router: Router
  ) {
  }

  initialize(){
    const id : number = this._route.snapshot.params['id'];
    this._consultantService.getConsultant(id).subscribe(
      consultant => {
        this.consultant = consultant;
        const user = this._authService.getUser();
        this.writingRights = 
          user.roles.includes(Role.MANAGER) && consultant.manager.id == user.id;
      },
      () => window.location.replace('not-found')
    )
  }

  ngOnInit() {
    this.initialize();
  }

  onReload(){
    console.log("reload page")
    this.ngOnInit();
  }
}
