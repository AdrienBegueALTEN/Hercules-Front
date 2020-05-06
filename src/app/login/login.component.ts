import { AppSettings } from './../app-settings';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

const EMAIL_KEY : string = 'email';
const PASSWORD_KEY : string = 'password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  hidden = true;
  loginForm = this.createForm();

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    if (this._authService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  createForm() {
    return new FormBuilder().group({
      email: [''],
      password: ['']
    });
  }

  onVisibility() : void { this.hidden = !this.hidden; }

  onSubmit() {
    let credentials = {
      email: this.loginForm.get(EMAIL_KEY).value,
      password: this.loginForm.get(PASSWORD_KEY).value
    }

    this._authService.login(credentials).subscribe(
      data => {
        this._authService.saveToken(data.accessToken);
        this._authService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.replace('home');
      },
      err => {
        this.isLoginFailed = true;
      }
    );
  }
}
