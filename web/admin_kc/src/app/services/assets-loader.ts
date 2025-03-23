import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetsLoaderService {
  private renderer: Renderer2;
  private loadedScripts: Set<string> = new Set();
  private loadedStyles: Set<string> = new Set();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadScript(src: string) {
    if (!this.loadedScripts.has(src)) {
      const script = this.renderer.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = true;
      this.renderer.appendChild(document.body, script);
      this.loadedScripts.add(src);
    }
  }

  loadStyle(href: string) {
    if (!this.loadedStyles.has(href)) {
      const link = this.renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      this.renderer.appendChild(document.head, link);
      this.loadedStyles.add(href);
    }
  }

  unloadScript(src: string) {
    if (this.loadedScripts.has(src)) {
      const scripts = document.querySelectorAll(`script[src="${src}"]`);
      scripts.forEach((script) => script.remove());
      this.loadedScripts.delete(src);
    }
  }

  unloadStyle(href: string) {
    if (this.loadedStyles.has(href)) {
      const links = document.querySelectorAll(`link[href="${href}"]`);
      links.forEach((link) => link.remove());
      this.loadedStyles.delete(href);
    }
  }
}
