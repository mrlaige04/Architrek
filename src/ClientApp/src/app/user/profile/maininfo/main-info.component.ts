import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../user.service";
import {map, Observable} from "rxjs";
import {DataResult} from "../../../core/Models/DataResult";
import {UserProfile} from "../../models/UserProfile";
import {ProfileAvatarComponent} from "./profile-avatar/profile-avatar.component";
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-maininfo',
  standalone: true,
  imports: [CommonModule, ProfileAvatarComponent, ChangePasswordComponent],
  templateUrl: './main-info.component.html',
  styleUrl: './main-info.component.scss'
})
export class MainInfoComponent {
  private user = inject(UserService);
  private auth = inject(AuthService)
  private router = inject(Router)

  profile$ = this.getProfile()

  profile = toSignal(this.profile$)

  getProfile() {
    return this.user.getProfile().pipe(
      map(profile => profile.data)
    )
  }

  deleteAccount() {
    this.user.deleteAccount().subscribe(
      async result => {
        if (result.succeeded) {
          this.auth.logout()
          await this.router.navigate(['/auth/login'])
        }
      }
    )
  }
}
