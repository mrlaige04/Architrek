import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment.development";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  hideMenuRoutes = [
    '/auth/login',
    '/auth/register',
    '/admin'
  ]

  title = 'Architrek';


}
