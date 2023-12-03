import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {ThemeService} from "../theme.service";

@Component({
  selector: 'app-dynamic-logo',
  standalone: true,
    imports: [CommonModule, RouterLink],
  templateUrl: './dynamic-logo.component.html',
  styleUrl: './dynamic-logo.component.scss'
})
export class DynamicLogoComponent {
  constructor(private themeService: ThemeService) {
  }

  isDarkTheme() {
    return this.themeService.isDarkTheme()
  }
}
