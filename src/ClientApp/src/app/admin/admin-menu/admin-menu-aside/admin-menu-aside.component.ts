import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-admin-menu-aside',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-menu-aside.component.html',
  styleUrl: './admin-menu-aside.component.scss'
})
export class AdminMenuAsideComponent {

}
