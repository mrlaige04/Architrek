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

@Injectable({
  providedIn: 'root'
})
export class PassTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.auth.accessToken;
    if (token) {
      if (!req.headers) {
        let headers = new HttpHeaders().set("Authorization", `${token.tokenType} ${token.accessToken}`)
        return next.handle(req.clone({headers: headers}))
      } else {
        let headers = req.headers.set("Authorization", `${token.tokenType} ${token.accessToken}`)
        return next.handle(req.clone({headers: headers}))
      }
    }
    else return next.handle(req);
  }
}
