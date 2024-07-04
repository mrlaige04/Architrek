import { Component } from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatBadge} from "@angular/material/badge";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatBadge
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

}
