import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeService} from "../theme.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  private theme = inject(ThemeService)

  toggleTheme() {
    this.theme.toggleTheme()
  }
}
