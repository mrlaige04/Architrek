import {Component, inject, input, OnDestroy, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Subscription } from "rxjs";
import {UserProfile} from "../../../models/UserProfile";
import {UserService} from "../../../user.service";
import {UserAvatar} from "../../../../core/Models/UserAvatar";

@Component({
  selector: 'app-profile-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-avatar.component.html',
  styleUrl: './profile-avatar.component.scss'
})
export class ProfileAvatarComponent implements OnDestroy {
  private user = inject(UserService);

  private subscriptions: Subscription[] = []

  profile = input.required<UserProfile>()

  avatarUploaded = output<string>()

  imageChoose(event: Event) {
    const target = event.target;
    const fileInput = target as HTMLInputElement;

    const files = fileInput.files;
    if (!files) return;

    const image = files[0]
    const sub = this.user.setAvatar(image)
      .subscribe(async result => {
        if (result.succeeded) {
          this.avatarUploaded.emit(await image.text())
        }
      })

    this.subscriptions.push(sub)
  }

  removeAvatar() {
    const sub = this.user.removeAvatar().subscribe(data => {
      if (data.succeeded) {
        this.avatarUploaded.emit('')
      }
    })

    this.subscriptions.push(sub)
  }

  private readonly noUserImage = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg'

  chooseAvatarIfExists(avatar: UserAvatar) {
    return !avatar || avatar.url === undefined || avatar.url == "undefined" ?
      this.noUserImage :
      avatar.url;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
