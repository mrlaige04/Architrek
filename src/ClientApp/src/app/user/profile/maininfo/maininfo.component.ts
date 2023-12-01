import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../user.service";
import {Observable} from "rxjs";
import {DataResult} from "../../../core/Models/DataResult";
import {UserProfile} from "../../models/UserProfile";
import {FileChangeEvent} from "@angular/compiler-cli/src/perform_watch";
import {CoreService} from "../../../core/core.service";

@Component({
  selector: 'app-maininfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maininfo.component.html',
  styleUrl: './maininfo.component.scss'
})
export class MaininfoComponent {
  profile: Observable<DataResult<UserProfile>>
  constructor(private user: UserService) {
    this.profile = user.getProfile()

  }

  imageChoose(event: Event) {
    const target = event.target;
    const fileInput = target as HTMLInputElement;

    const files = fileInput.files;
    if (!files) return;

    const image = files[0]
    this.user.setAvatar(image).subscribe()
  }

  removeAvatar() {
    this.user.removeAvatar().subscribe(data => {
      console.log(data)
    })
  }
}
