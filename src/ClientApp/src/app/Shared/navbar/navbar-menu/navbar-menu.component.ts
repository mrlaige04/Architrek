import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {ThemeService} from "../../theme.service";
import {AuthMenuComponent} from "./auth-menu/auth-menu.component";
import {ThemeSwitcherComponent} from "../../theme-switcher/theme-switcher.component";
import {AdminService} from "../../../admin/admin.service";
import {catchError, Observable, of} from "rxjs";

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, AuthMenuComponent, ThemeSwitcherComponent],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.scss'
})
export class NavbarMenuComponent {
  isAdmin$: Observable<boolean>
  constructor(private admin: AdminService) {
    this.isAdmin$ = admin.isInAdmin$
      .pipe(
        catchError(
          _ =>of(false)
        )
      );
  }

}
