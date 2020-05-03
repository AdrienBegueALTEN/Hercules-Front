import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-consultant-card',
  templateUrl: './consultant-card.component.html',
  styleUrls: ['./consultant-card.component.scss']
})
export class ConsultantCardComponent implements OnInit, OnDestroy {
  consultant: any;
  navigationSubscription;   

  isAuthenticated: boolean;
  user: any;
  
  constructor(private consultantService: ConsultantService, 
    private route: ActivatedRoute,
    private router:Router,
    private _authService: AuthService) { 
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialize();
        }
      });
    }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(){
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  initialize(){

    this.isAuthenticated = !!this._authService.getToken();

    if (this.isAuthenticated) {
      this.user = this._authService.getUser();
    }


    const id = this.route.snapshot.params['id'];
    this.consultantService.getById(+id).subscribe(
      (data)=>{
        this.consultant=data;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
