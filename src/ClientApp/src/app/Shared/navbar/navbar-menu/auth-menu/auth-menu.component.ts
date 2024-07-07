import {Component, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../../auth/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-auth-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, MatButtonModule, MatMenuModule, MatDivider, MatIcon],
  templateUrl: './auth-menu.component.html',
  styleUrl: './auth-menu.component.scss'
})
export class AuthMenuComponent{
  private authService = inject(AuthService);

  isAuthenticated = this.authService.isAuthenticated;

  logout() {
    this.authService.logout()
  }
}
