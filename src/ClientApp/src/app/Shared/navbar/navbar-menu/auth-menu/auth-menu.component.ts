import {Component, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../../auth/auth.service";
import {catchError, Observable, of} from "rxjs";
import {AdminService} from "../../../../admin/admin.service";
import {UserService} from "../../../../user/user.service";
import {UserProfile} from "../../../../user/models/UserProfile";
import {DataResult} from "../../../../core/Models/DataResult";


@Component({
  selector: 'app-auth-menu',
  standalone: true,
    imports: [CommonModule, RouterLink],
  templateUrl: './auth-menu.component.html',
  styleUrl: './auth-menu.component.scss'
})
export class AuthMenuComponent{
  isAuthenticated$: Observable<boolean>
  userProfile$: Observable<DataResult<UserProfile>>

  constructor(private authService: AuthService, private user: UserService) {
    this.isAuthenticated$ = authService.isAuthenticated$;
    this.userProfile$ = user.getProfile()
  }

  logout() {
    this.authService.logout()
  }
}
