import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-user-profile-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatTabNav, MatTabLink, RouterLinkActive, MatIcon, MatTabNavPanel],
  templateUrl: './user-profile-main.component.html',
  styleUrl: './user-profile-main.component.scss'
})
export class UserProfileMainComponent {
  tabs: Tab[] = [
    { label: 'Profile', url: '/user/profile', icon: 'person' },
    { label: 'Favorites', url: '/user/favorite', icon: 'favorite' },
    { label: 'Reviews', url: '/user/reviews', icon: 'star' },
  ]
}

export interface Tab {
  label: string;
  url: string;
  icon?: string;
}
