import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class PassTokenInterceptor implements HttpInterceptor {
  constructor(private token: TokenService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.accessToken;

    if (!token) return next.handle(req);

    return next.handle(req.clone({
      setHeaders: {
        'Authorization': `${token.tokenType} ${token.accessToken}`
      }
    }))
  }
}
