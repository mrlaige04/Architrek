import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeSwitcherComponent} from "../../../Shared/theme-switcher/theme-switcher.component";
import {DynamicLogoComponent} from "../../../Shared/dynamic-logo/dynamic-logo.component";

@Component({
  selector: 'app-admin-menu-navbar',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, DynamicLogoComponent],
  templateUrl: './admin-menu-navbar.component.html',
  styleUrl: './admin-menu-navbar.component.scss'
})
export class AdminMenuNavbarComponent {

}
