import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-consultant-card',
  templateUrl: './consultant-card.component.html',
  styleUrls: ['./consultant-card.component.scss']
})
export class ConsultantCardComponent implements OnInit, OnDestroy {
  consultant: any;
  navigationSubscription;   
  constructor(private consultantService: ConsultantService, 
    private route: ActivatedRoute,
    private router:Router) { 
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NaviggetConsultantd event re-initalise the component
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
    const id = this.route.snapshot.params['id'];
    this.consultantService.getConsultant(+id).subscribe(
      (data)=>{
        this.consultant=data;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
