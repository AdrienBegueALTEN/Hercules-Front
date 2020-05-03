import { Component, Input } from '@angular/core';
import { ConsultantService } from 'src/app/_services/consultant.service';

@Component({
  selector: 'app-consultant-view',
  templateUrl: './consultant-view.component.html',
  styleUrls: ['./consultant-view.component.scss']
})
export class ConsultantViewComponent {
  @Input() consultant : any;

  
  constructor() { }

}
