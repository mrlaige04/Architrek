import {Inject, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {LoginModel} from "./models/loginmodel";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {RegisterModel} from "./models/registermodel";
import {AccessTokenResponse} from "./models/accesstokenresponse";
import {ValidationProblem} from "./models/ValidationProblem";
import {CryptoService} from '../Shared/crypto.service';
import {ApiConfig} from "../core/providers/apiConfig.provider";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private crypto = inject(CryptoService)
  baseUrl : string;

  authTokenKey = "authToken"
  expiresTokenKey = "tokenExpires"

  isAuthenticated = signal(this.isUserAuthenticated());

  private readonly isAuthenticatedSubject : BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    @Inject('API_CONFIG') apiConfig: ApiConfig
    )
  {
    this.baseUrl = apiConfig.apiUrl + 'identity/'

    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isUserAuthenticated());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  private get currentToken(): AccessTokenResponse | null {
    let codedToken = localStorage.getItem(this.authTokenKey)
    if (codedToken == null) return null;

    let tokenString = this.crypto.decrypt(codedToken);
    if (this.isJson(tokenString)) {
      let json = <AccessTokenResponse>JSON.parse(tokenString);
      return json as AccessTokenResponse;
    }
    return null;
  }

  get accessToken(): AccessTokenResponse|null {
    let codedToken = localStorage.getItem(this.authTokenKey)
    let expires = localStorage.getItem(this.expiresTokenKey)

    if (codedToken == null || expires == null) return null;
    let tokenString = this.crypto.decrypt(codedToken);
    let numericExpires = parseFloat(expires)

    if (isNaN(numericExpires) && !isFinite(numericExpires)) {
      return null;
    }

    if (this.isJson(tokenString)) {
      let json = <AccessTokenResponse>JSON.parse(tokenString);

      let token = json as AccessTokenResponse;
      if (this.tokenExpired(numericExpires)) {
        let refreshResult = false;
        this.refresh(token.refreshToken).subscribe(
            (_refreshResult: boolean) => { refreshResult = _refreshResult; }
        )
        if (refreshResult) return this.currentToken;
        else return null;
      }
      else return token;
    } else return null;
  }


  checkEmailAvailability(email: string): Observable<boolean> {
    let uri = this.baseUrl + "emailAvailable?email=" + email;
    return this.http.get<boolean>(uri);
  }

  login(loginModel: LoginModel) {
    const url = this.baseUrl + "login"
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("accept", "application/json")

    return this.http.post<AccessTokenResponse | ValidationProblem>(url, loginModel, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            return of({
              failed: true,
              reason: "Invalid credentials or (user does not exists or has not confirmed account)"
            })
          }
          return of(null)
        })
      )
  }

  register(registerModel: RegisterModel) {
    const url = this.baseUrl + "register"
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("accept", "application/json")

    return this.http.post<void|ValidationProblem>(url, registerModel, { headers })
  }

  forgotPassword(email: ForgotPassword) {
    const url = this.baseUrl + "forgotPassword"
    return this.http.post<ValidationProblem>(url, email)
  }

  resetPassword(reset: ResetPassword) {
    const url = this.baseUrl + "resetPassword"
    return this.http.post<ValidationProblem>(url, reset)
  }

  isUserAuthenticated()
  {
    const codedToken = localStorage.getItem(this.authTokenKey)
    const expires = localStorage.getItem(this.expiresTokenKey)

    if (!codedToken || !expires) {
      this.clearAuthData()
      return false;
    }

    const numericExpires = parseFloat(expires)
    if (isNaN(numericExpires) && !isFinite(numericExpires)) {
      this.clearAuthData();
      return false;
    }

    const tokenString = this.crypto.decrypt(codedToken);
    if (this.isJson(tokenString)) {
      const json = <AccessTokenResponse>JSON.parse(tokenString);

      const token = json as AccessTokenResponse;
      if (this.tokenExpired(numericExpires)) {
        let refreshResult = false;
        this.refresh(token.refreshToken).subscribe(
          (_refreshResult: boolean) => { refreshResult = _refreshResult; }
        )
        if (!refreshResult) this.clearAuthData()
        return refreshResult;
      } else return true;
    } else {
      this.clearAuthData()
      return false;
    }
  }

  refresh(refreshToken: string) {
    const url = this.baseUrl + "refresh";
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")

    return this.http.post(url,{ refreshToken }, { headers })
      .pipe(
        map((response:any)=>{
          if (response instanceof AccessTokenResponse) {
            this.authenticateFromToken(response);
            return true;
          }
          return false;
        }),
        catchError(error => {
          if (error.status === 401) return of(false);
          throw error;
        })
    )
  }

  changePassword(password: ChangePassword) {
    const url = this.baseUrl + "manage/info"
    return this.http.post<ValidationProblem | ChangePasswordResult>(url, password)
  }

  isJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  authenticateFromToken(token: AccessTokenResponse) {
    if (!token) return;
    const timespan = token.expiresIn * 1000;
    const expires = new Date().getTime() + timespan;

    let codedToken = this.crypto.encrypt(JSON.stringify(token));
    localStorage.setItem(this.authTokenKey, codedToken)
    localStorage.setItem(this.expiresTokenKey, expires.toString())

    this.isAuthenticated.set(true)
  }


  private clearAuthData() {
    localStorage.removeItem(this.authTokenKey)
    localStorage.removeItem(this.expiresTokenKey)
  }

  logout() {
    if (this.isUserAuthenticated()) {
      this.isAuthenticated.set(false)
    }
    localStorage.removeItem(this.authTokenKey)
    localStorage.removeItem(this.expiresTokenKey)
  }

  private tokenExpired(expiresNumber: number): boolean {
    const currentTime = new Date().getTime();
    return currentTime > expiresNumber;
  }
}

export type ForgotPassword = {email: string}
export type ResetPassword = {email: string, resetCode: string, newPassword: string}
export type ChangePassword = {oldPassword: string, newPassword: string}
export type ChangePasswordResult = {email: string, isEmailConfirmed: boolean}
