import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeService} from "../theme.service";

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  constructor(private themeService: ThemeService) {
  }

  toggleTheme() {
    this.themeService.toggleTheme()
  }
}
