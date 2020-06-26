import { Component, OnInit, Input } from '@angular/core';

/**
 * Component for the header used for an anonymous user when he fills in the information for a mission with the link he received.
 */
@Component({
  selector: 'app-external-header',
  templateUrl: './external-header.component.html',
  styleUrls: ['../header.scss']
})
export class ExternalHeaderComponent implements OnInit {

  /**
   * Information of the mission received from the parent component
   */
  @Input() mission : any;

  constructor() { }

  ngOnInit() {
  }

}
