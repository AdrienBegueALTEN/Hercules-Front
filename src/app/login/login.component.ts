import { AppSettings } from './../app-settings';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  createForm() {
    return new FormBuilder().group({
      email: ['', [Validators.required, Validators.pattern(AppSettings.EMAIL_PATTERN)]],
      password: ['', [Validators.required]]
    });
  }

  onVisibility() : void { this.hidden = !this.hidden; }

  onSubmit() {
    let credentials = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.authService.login(credentials).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.replace('home');
      },
      err => {
        this.isLoginFailed = true;
      }
    );
  }

  getEmailErr(): String {
    return  this.loginForm.get('email').hasError('required') ? 'Email obligatoire' :
            this.loginForm.get('email').hasError('pattern') ? 'Format du email invalide' : '';
  }

  getPasswordErr(): String {
    return this.loginForm.get('password').hasError('required') ? 'Mot de passe obligatoire' : '';
  }
}
