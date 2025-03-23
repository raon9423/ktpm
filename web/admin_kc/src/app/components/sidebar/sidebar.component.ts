import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // const script = this.renderer.createElement('script');
    // script.src = "assets/js/script.js";
    // script.type = "text/javascript";
    // script.async = true;
    // this.renderer.appendChild(document.body, script);
    
  }
}
