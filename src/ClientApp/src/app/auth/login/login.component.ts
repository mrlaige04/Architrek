import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {AuthService} from "../auth.service";
import {AccessTokenResponse} from "../models/accesstokenresponse";
import {jwtDecode} from "jwt-decode";
import {ThemeService} from "../../Shared/theme.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(fb: FormBuilder, private auth: AuthService, public themeService: ThemeService, private router: Router) {
    this.loginForm = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  submit() {
    if (this.loginForm.valid)
    {
      this.auth.login(this.loginForm.value).subscribe(async (data)=>{
        let token = <AccessTokenResponse>data;
        if (token) {
          localStorage.setItem('accessToken', token.accessToken)
          localStorage.setItem('refreshToken', token.refreshToken)
          await this.router.navigate(['/'])
        }
      })
    } else console.log("not valid")
  }

  protected readonly alert = alert;
}
