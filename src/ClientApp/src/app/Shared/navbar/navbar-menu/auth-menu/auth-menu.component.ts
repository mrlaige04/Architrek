import {Component, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../../auth/auth.service";
import {Observable} from "rxjs";
import {AdminService} from "../../../../admin/admin.service";


@Component({
  selector: 'app-auth-menu',
  standalone: true,
    imports: [CommonModule, RouterLink],
  templateUrl: './auth-menu.component.html',
  styleUrl: './auth-menu.component.scss'
})
export class AuthMenuComponent{
  isAuthenticated$: Observable<boolean>
  constructor(private authService: AuthService) {
    this.isAuthenticated$ = authService.isAuthenticated$;
  }

  logout() {
    this.authService.logout()
  }
}
