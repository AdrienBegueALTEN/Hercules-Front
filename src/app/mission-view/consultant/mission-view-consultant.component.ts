import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mission-view-consultant',
  templateUrl: './mission-view-consultant.component.html',
  styleUrls: ['./../mission-view.component.scss']
})
export class MissionViewConsultantComponent implements OnInit {

  @Input() consultant : any;

  constructor() { }

  ngOnInit() {
  }

  xpToString (xp : number) : string {
    switch(xp) {
      case 0 : return 'Débutant'
      case 1 : return '1 an'
      default : return  xp + ' ans'
    }
  }

}
