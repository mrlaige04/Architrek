import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthMenuComponent} from "./auth-menu/auth-menu.component";
import {ThemeSwitcherComponent} from "../../theme-switcher/theme-switcher.component";
import {AdminService} from "../../../admin/admin.service";
import {catchError, Observable, of} from "rxjs";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, AuthMenuComponent, ThemeSwitcherComponent, MatAnchor],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.scss'
})
export class NavbarMenuComponent {
  private adminService = inject(AdminService)

  isAdmin = this.adminService.isAdmin;
}
