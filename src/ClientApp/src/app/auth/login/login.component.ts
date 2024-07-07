import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AccessTokenResponse} from "../models/accesstokenresponse";
import {Router} from "@angular/router";
import {DynamicLogoComponent} from "../../Shared/dynamic-logo/dynamic-logo.component";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    DynamicLogoComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError
  ],
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
        .subscribe({
          next: async (data) => {
            console.log((data as AccessTokenResponse).accessToken);
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
        })
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
