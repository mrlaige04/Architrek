import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService)
  const accessToken = token.accessToken;

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        'Authorization': `${accessToken.tokenType} ${accessToken.accessToken}`
      }
    })
  }

  return next(req);
};
