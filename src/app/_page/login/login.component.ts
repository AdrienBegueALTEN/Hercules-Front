import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from 'src/app/_dialog/change-password/change-password-dialog.component';
import { ActivatedRoute } from '@angular/router';

const EMAIL_KEY : string = 'email';
const PASSWORD_KEY : string = 'password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoginFailed : boolean = false;
  public hidePassword : boolean = true;
  public grp = new FormBuilder().group({
    email: [''],
    password: ['']
  });

  constructor(
    private _authService: AuthService,
    private _dialog : MatDialog,
    private _route : ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const token = this._route.snapshot.params['token'];
    if (!token) return;
    this._authService.checkPasswordTokenValidity(token).subscribe(
      () => {
        const dialogConfig : MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = true;
        this._dialog.open(ChangePasswordDialogComponent, dialogConfig).afterClosed().subscribe(
          dialogData => {
            this._authService.changePasswordAnonymous(token, dialogData.newPassword).subscribe(
              (apiData) => {
                this._authService.saveToken(apiData.accessToken);
                this._authService.saveUser(apiData.user);
                window.location.replace('');
              },
              () => window.location.replace('')
            )
          },
          () => window.location.replace('')
        )
      },
      () => window.location.replace('')
    )

  }

  public onSubmit() : void {
    let credentials = {
      email: this.grp.get(EMAIL_KEY).value,
      password: this.grp.get(PASSWORD_KEY).value
    }

    this._authService.login(credentials).subscribe(
      data => {
        this._authService.saveToken(data.accessToken);
        this._authService.saveUser(data.user);
        window.location.replace('');
      },
      () => this.isLoginFailed = true
    );
  }
}
