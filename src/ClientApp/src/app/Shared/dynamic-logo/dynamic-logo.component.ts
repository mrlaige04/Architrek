import {Component, inject, input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";
import {ThemeService} from "../theme.service";

@Component({
  selector: 'app-dynamic-logo',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './dynamic-logo.component.html',
  styleUrl: './dynamic-logo.component.scss'
})
export class DynamicLogoComponent {
  private theme = inject(ThemeService)

  readonly lightLogo = './assets/brand2/png/logo-no-background.png'
  readonly darkLogo = './assets/architrek-low-resolution-logo-white-on-transparent-background.png'

  width = input<number>(90);

  isDarkTheme() {
    return this.theme.isDarkTheme()
  }
}
