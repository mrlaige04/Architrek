import { Component } from '@angular/core';
import {ThemeService} from "../theme.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private themeService: ThemeService, public authService: AuthService) {
  }
  toggleTheme() {
    this.themeService.toggleTheme()
  }

  isDarkTheme() {
    return this.themeService.isDarkTheme()
  }
}
