import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  savedThemeKey = "svd-thm"
  constructor() {
    this.trySetSavedTheme()
  }

  private trySetSavedTheme() {
    let theme = localStorage.getItem(this.savedThemeKey);
    if (theme) this.setTheme(theme)
  }

  setTheme(theme: string) {
    if (theme === "dark") document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }

  toggleTheme() {
    document.body.classList.toggle("dark")
    this.saveTheme(this.isDarkTheme()?"dark":"light")
  }

  isDarkTheme() : boolean  {
    return document.body.classList.contains("dark")
  }

  private saveTheme(theme: string) {
    localStorage.setItem(this.savedThemeKey, theme)
  }
}
