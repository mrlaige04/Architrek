import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {AuthService} from "../auth.service";
import {AccessTokenResponse} from "../models/accesstokenresponse";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(fb: FormBuilder, private auth: AuthService) {
    this.loginForm = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, RxwebValidators.password({
        validation: {
          digit: true,
          lowerCase: true,
          specialCharacter: false,
          upperCase: true,
          alphabet: false
        }
      })])
    })
  }

  submit() {// TODO : form Validation and tokens
    if (true)
    {
      this.auth.login(this.loginForm.value).subscribe((data)=>{
        let token = <AccessTokenResponse>data;
        if (token) {
          localStorage.setItem('accessToken', token.accessToken)
          localStorage.setItem('refreshToken', token.refreshToken)
          let tkn = jwtDecode(token.accessToken);
          console.log(tkn.exp)
        }
      })
    } else console.log("not valid")
  }
}
