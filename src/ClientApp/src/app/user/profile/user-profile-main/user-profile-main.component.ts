import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-profile-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './user-profile-main.component.html',
  styleUrl: './user-profile-main.component.scss'
})
export class UserProfileMainComponent {

}
