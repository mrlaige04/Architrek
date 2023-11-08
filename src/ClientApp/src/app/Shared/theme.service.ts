import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  toggleTheme() {
    document.body.classList.toggle("dark")
  }

  isDarkTheme() : boolean  {
    return document.body.classList.contains("dark")
  }
}
