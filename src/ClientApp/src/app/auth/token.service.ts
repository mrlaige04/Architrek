import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {AccessTokenResponse} from "./models/accesstokenresponse";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private auth: AuthService) {

  }

  get accessToken(): AccessTokenResponse|null {
    return this.auth.accessToken
  }
}
