import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {AuthService} from "../auth.service";
import {AccessTokenResponse} from "../models/accesstokenresponse";
import {jwtDecode} from "jwt-decode";
import {ThemeService} from "../../Shared/theme.service";
import {Router} from "@angular/router";
import { CryptoService } from 'src/app/Shared/crypto.service';
import {catchError, of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hasError = false;
  errorReason = '';
  constructor(fb: FormBuilder,
    private auth: AuthService,
    private router: Router
   ) {
    this.loginForm = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  submit() {
    this.hasError = false;
    this.errorReason = '';
    if (this.loginForm.valid)
    {
      this.auth.login(this.loginForm.value)
          .subscribe(
          async (data) => {
              if (data != null && (<LoginError>data).failed) {
                  this.hasError = true;
                  this.errorReason = (<LoginError>data).reason
              } else {
                  let token = <AccessTokenResponse>data;
                  if (token) {
                      this.auth.authenticateFromToken(token);
                      await this.router.navigate(['/'])
                  }
              }
          }
      )
    } else {
        this.hasError = true;
        this.errorReason = 'Email is not valid';
    }
  }


}
export class LoginError  {
    constructor(public failed: boolean, public reason: string) {
    }
}
