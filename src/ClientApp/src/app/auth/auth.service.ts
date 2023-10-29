import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LoginModel} from "./models/loginmodel";
import {Observable} from "rxjs";
import {RegisterModel} from "./models/registermodel";
import {AccessTokenResponse} from "./models/accesstokenresponse";
import {ValidationProblem} from "./models/ValidationProblem";
import {Guid} from "guid-typescript";
import {ConfirmEmail} from "./models/ConfirmEmail";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUri = "https://localhost:7143/api/Identity/"
  constructor(private http: HttpClient) { }

  login(loginModel: LoginModel): Observable<AccessTokenResponse|ValidationProblem> {
    let loginUri = this.baseUri + "login"
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("accept", "application/json")
    return this.http.post<AccessTokenResponse|ValidationProblem>(loginUri, loginModel, {headers:headers})
  }

  register(registerModel: RegisterModel): Observable<Guid|ValidationProblem> {
    let registerUri = this.baseUri + "register"
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("accept", "application/json")
    return this.http.post<Guid|ValidationProblem>(registerUri, registerModel, {headers: headers})
  }

  confirmEmail(confirmEmailModel: ConfirmEmail) {
    let confirmEmailUri = this.baseUri+"confirmEmail";
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")

    return this.http.post(confirmEmailUri, confirmEmailModel, {headers: headers})
  }

  /*isAuthenticated()
  {
    let accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return false;

    let jwt = jwtDecode(accessToken);
    if (!jwt.exp & jwt.exp * 100 > )

    return jwt.exp && jwt.exp * 1000 <= Date.now()
  }*/
}

