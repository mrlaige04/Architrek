import { Component } from '@angular/core';
import {ToastersService} from "./services/ToastersService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideMenuRoutes = [
    '/auth/login',
    '/auth/register',
    '/admin'
  ]

  title = 'Architrek';

}
