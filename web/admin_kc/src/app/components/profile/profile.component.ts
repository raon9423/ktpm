import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsLoaderService } from '../../services/assets-loader';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private assetsLoader: AssetsLoaderService) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
  }
}
