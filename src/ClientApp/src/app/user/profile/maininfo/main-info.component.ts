import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../user.service";
import {Observable} from "rxjs";
import {DataResult} from "../../../core/Models/DataResult";
import {UserProfile} from "../../models/UserProfile";
import {ProfileAvatarComponent} from "./profile-avatar/profile-avatar.component";
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-maininfo',
  standalone: true,
  imports: [CommonModule, ProfileAvatarComponent],
  templateUrl: './main-info.component.html',
  styleUrl: './main-info.component.scss'
})
export class MainInfoComponent {
  profile: Observable<DataResult<UserProfile>>
  constructor(private user: UserService,
              private auth: AuthService,
              private router: Router) {
    this.profile = user.getProfile()
  }
  getProfile() {
    this.profile = this.user.getProfile()
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
