import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-consultant-view',
  templateUrl: './consultant-view.component.html',
  styleUrls: ['./consultant-view.component.scss']
})
export class ConsultantViewComponent {
  @Input() consultant : any;
}
