import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  errorMessage = '';
  roles: string[] = [];
  hidden = true;
  loginForm = this.createForm();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  createForm() {
    let emailregex = '[a-zA-Z]+\\.[a-zA-Z]+@alten\\.com'
    return new FormBuilder().group({
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
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
        this.roles = this.tokenStorage.getUser().roles;
        window.location.replace('home');
      },
      err => {
        this.errorMessage = err.error.message;
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
