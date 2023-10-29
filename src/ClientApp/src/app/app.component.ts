import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideMenuRoutes = [
    '/auth/login',
    '/auth/register'
  ]

  title = 'Architrek';
}
