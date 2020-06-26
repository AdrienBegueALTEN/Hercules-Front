import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

/**
 * Main application component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * Contains information about the logged in user. 
   * This information is fetched from the authService service
   */
  user : any;

  /**
   * 
   * @param _authService Used to fetch information about the user
   */
  constructor(
    private _authService : AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

  /**
   * True : Shows the header
   * False : Hides the header
   */
  public showNavigationHeader() : boolean {
    return true;
  }

}