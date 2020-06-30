import { DialogUtilsService } from 'src/app/_services/utils/dialog-utils.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'ts-md5';

const EMAIL_KEY : string = 'email';
const PASSWORD_KEY : string = 'password';

/**
 * Component for the login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * True : the identifiers were false / False : the identifiers are good or the user didn't try to connect yet
   */
  public isLoginFailed : boolean = false;
  /**
   * True : the password is hidden / False : the password is visible
   */
  public hidePassword : boolean = true;

  /**
   * Form for the identifiers
   */
  public grp = new FormBuilder().group({
    email: [''],
    password: ['']
  });

  constructor(
    private _authService: AuthService,
    private _dialogUtils : DialogUtilsService,
    private _route : ActivatedRoute,
    private _router : Router
  ) {}

  public ngOnInit(): void {
    const token = this._route.snapshot.params['token'];
    if (!token) return;
    this._authService.checkPasswordTokenValidity(token).subscribe(
      () => {
        this._dialogUtils.showChangePasswordDialog().afterClosed().subscribe(
          newPassword => {
            this._authService.changePasswordAnonymous(token, newPassword).subscribe(
              (apiData) => this._login(apiData),
      )})})}

  /**
   * Function activated when the user submits his identifiers, it sends an http request to check them and then connects or not the user
   */
  public onSubmit() : void {
    let credentials = {
      email: this.grp.get(EMAIL_KEY).value,
      password: (String)(Md5.hashStr(this.grp.get(PASSWORD_KEY).value))
    }

    this._authService.login(credentials).subscribe(
      data => this._login(data),
      () => this.isLoginFailed = true
    );
  }
  /**
   * Function that connects the user, by saving his token, his details and leading him to the main page
   * @param data user and authentication's details
   */
  private _login(data : any) : void {
    this._authService.saveToken(data.accessToken);
    this._authService.saveUser(data.user);
    this._router.navigateByUrl('');
  }
}