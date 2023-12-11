import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from "rxjs";
import {DataResult} from "../../../../core/Models/DataResult";
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
export class ProfileAvatarComponent {
  @Input({required: true}) profile?: Observable<DataResult<UserProfile>>

  @Output() avatarUploaded: EventEmitter<any> = new EventEmitter<any>();
  constructor(private user: UserService) {

  }

  imageChoose(event: Event) {
    const target = event.target;
    const fileInput = target as HTMLInputElement;

    const files = fileInput.files;
    if (!files) return;

    const image = files[0]
    this.user.setAvatar(image)
      .subscribe(result => {
        if (result.succeeded) {
          this.avatarUploaded.emit()
        }
      })
  }

  removeAvatar() {
    this.user.removeAvatar().subscribe(data => {
      if (data.succeeded) {
        this.avatarUploaded.emit()
      }
    })
  }

  chooseAvatarIfExists(avatar: UserAvatar) {
    return !avatar || avatar.url === undefined || avatar.url == "undefined" ?
      'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg' : avatar.url;
  }
}
