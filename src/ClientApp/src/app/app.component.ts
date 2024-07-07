import {Component} from '@angular/core';
import {NavbarComponent} from "./Shared/navbar/navbar.component";
import {FooterComponent} from "./Shared/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {HideMenuDirective} from "./Shared/hide-menu.directive";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    HideMenuDirective
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  hideMenuRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot',
  ]

  title = 'Architrek';
}
