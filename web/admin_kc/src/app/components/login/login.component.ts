import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsLoaderService } from '../../services/assets-loader';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private assetsLoader: AssetsLoaderService) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
  }

}
