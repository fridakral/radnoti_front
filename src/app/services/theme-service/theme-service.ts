import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private _colorTheme: string;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    this.getColorTheme();
    this.renderer.addClass(document.body, this._colorTheme);
  }

  update(theme: 'dark-mode' | 'light-mode') {
    this.setcolorTheme(theme);
    const prevColorTheme = theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this.renderer.removeClass(document.body, prevColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  isDarkMode() {
    return this._colorTheme === 'dark-mode';
  }

  private setcolorTheme(theme: string) {
    this._colorTheme = theme;
    localStorage.setItem('user_theme', theme);
  }

  private getColorTheme() {
    if (localStorage.getItem('user_theme')) {
      this._colorTheme = localStorage.getItem('user_theme') as string;
    } else {
      this._colorTheme = 'dark-mode';
    }
  }
}
