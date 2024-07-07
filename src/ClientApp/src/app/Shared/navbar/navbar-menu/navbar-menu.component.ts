import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthMenuComponent} from "./auth-menu/auth-menu.component";
import {ThemeSwitcherComponent} from "../../theme-switcher/theme-switcher.component";
import {AdminService} from "../../../admin/admin.service";
import {MatAnchor, MatIconAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NotificationsComponent} from "../../../user/notifications/notifications.component";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, AuthMenuComponent, ThemeSwitcherComponent, MatAnchor, MatIconAnchor, MatIcon, NotificationsComponent],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.scss'
})
export class NavbarMenuComponent {
  private auth = inject(AuthService);

  isAdmin = this.auth.isAdmin;
  isAuthenticated = this.auth.isAuthenticated;
}
