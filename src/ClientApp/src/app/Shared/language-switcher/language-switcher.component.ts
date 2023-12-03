import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
  localeList = [
    {code: 'en', label: 'English'},
    {code: 'uk', label: 'Українська'},
    {code: 'de', label: 'Deutsch'}
  ]
}
