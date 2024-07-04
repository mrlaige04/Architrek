import {Component, computed, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";
import {UserService} from "../../../../user/user.service";
import {AuthService} from "../../../../auth/auth.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-auth-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, MatButtonModule, MatMenuModule, MatDivider],
  templateUrl: './auth-menu.component.html',
  styleUrl: './auth-menu.component.scss'
})
export class AuthMenuComponent{
  private authService = inject(AuthService);
  private userService = inject(UserService);

  readonly noUserAvatar = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'

  isAuthenticated = this.authService.isAuthenticated;
  userProfile$ = this.userService.getProfile()
  userProfile = toSignal(this.userProfile$)

  hasAvatar = computed(() =>
    !!this.userProfile()?.data.avatar &&
    !!this.userProfile()?.data.avatar.url
  )

  logout() {
    this.authService.logout()
  }
}
