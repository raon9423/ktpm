import { Component } from '@angular/core';
import { RouterOutlet ,Router,NavigationEnd} from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import {NgIf ,NgFor} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Thêm dòng này
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    SidebarComponent,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin_kc';
  
  isLoginPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login' || this.router.url === '/register';
      }
    });
  }
}
