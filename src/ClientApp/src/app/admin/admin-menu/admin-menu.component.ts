import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AdminMenuNavbarComponent} from "./admin-menu-navbar/admin-menu-navbar.component";
import {AdminMenuAsideComponent} from "./admin-menu-aside/admin-menu-aside.component";
import {DynamicLogoComponent} from "../../Shared/dynamic-logo/dynamic-logo.component";
import {ThemeSwitcherComponent} from "../../Shared/theme-switcher/theme-switcher.component";


@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminMenuNavbarComponent, AdminMenuAsideComponent, DynamicLogoComponent, ThemeSwitcherComponent, RouterLink],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss'
})
export class AdminMenuComponent {

}
