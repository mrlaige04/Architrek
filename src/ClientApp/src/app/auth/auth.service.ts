import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {LoginModel} from "./models/loginmodel";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {RegisterModel} from "./models/registermodel";
import {AccessTokenResponse} from "./models/accesstokenresponse";
import {ValidationProblem} from "./models/ValidationProblem";
import {CryptoService} from '../Shared/crypto.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUri = "http://localhost:5000/api/Identity/"
  authTokenKey = "authToken"
  expiresTokenKey = "tokenExpires"

  private readonly isAuthenticatedSubject : BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private crypto: CryptoService,
    )
  {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
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
    let uri = this.baseUri + "emailAvailable?email=" + email;
    return this.http.get<boolean>(uri);
  }

  login(loginModel: LoginModel): Observable<AccessTokenResponse|ValidationProblem|{failed:boolean, reason:string}|null> {
    let loginUri = this.baseUri + "login"
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("accept", "application/json")
    return this.http.post<AccessTokenResponse|ValidationProblem>(loginUri, loginModel, {headers:headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status == 401) {
              return of({failed: true, reason: "Invalid credentials or (user does not exists or has not confirmed account)"})
            }
            return of(null)
          }))
  }

  register(registerModel: RegisterModel): Observable<void|ValidationProblem> {
    let registerUri = this.baseUri + "register"
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("accept", "application/json")
    return this.http.post<void|ValidationProblem>(registerUri, registerModel, {headers: headers})
  }

  forgotPassword(email: ForgotPassword) {
    let uri = this.baseUri + "forgotPassword"
    console.log(email)
    return this.http.post<ValidationProblem>(uri, email)
  }

  resetPassword(reset: ResetPassword) {
    let uri = this.baseUri + "resetPassword"
    return this.http.post<ValidationProblem>(uri, reset)
  }

  isAuthenticated(): boolean
  {
    let codedToken = localStorage.getItem(this.authTokenKey)
    let expires = localStorage.getItem(this.expiresTokenKey)

    if (!codedToken || !expires) {
      //this.isAuthenticatedSubject.next(false);
      this.clearAuthData()
      return false;
    }

    let numericExpires = parseFloat(expires)
    if (isNaN(numericExpires) && !isFinite(numericExpires)) {
      //this.isAuthenticatedSubject.next(false);
      this.clearAuthData();
      return false;
    }

    let tokenString = this.crypto.decrypt(codedToken);

    if (this.isJson(tokenString)) {
      let json = <AccessTokenResponse>JSON.parse(tokenString);

      let token = json as AccessTokenResponse;
      if (this.tokenExpired(numericExpires)) {
        let refreshResult = false;
        this.refresh(token.refreshToken).subscribe(
          (_refreshResult: boolean) => { refreshResult = _refreshResult; }
        )
        //this.isAuthenticatedSubject.next(refreshResult);
        if (!refreshResult) this.clearAuthData()
        return refreshResult;
      } else return true;
    } else {
     // this.isAuthenticatedSubject.next(false);
      this.clearAuthData()
      return false;
    }
  }

  refresh(refreshToken: string): Observable<boolean> {
    let uri = this.baseUri + "refresh";
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")

    return this.http.post(uri, JSON.stringify({refreshToken: refreshToken}), {headers: headers}).pipe(
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
    let uri = this.baseUri + "manage/info"
    return this.http.post<ValidationProblem|ChangePasswordResult>(uri, password)
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
    this.isAuthenticatedSubject.next(true);
  }


  private clearAuthData() {
    localStorage.removeItem(this.authTokenKey)
    localStorage.removeItem(this.expiresTokenKey)
  }

  logout() {
    if (this.isAuthenticated()) {
      this.isAuthenticatedSubject.next(false);
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
