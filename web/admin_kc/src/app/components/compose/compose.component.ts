import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsLoaderService } from '../../services/assets-loader';
@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.css',
})
export class ComposeComponent implements OnInit, OnDestroy {
  constructor(private assetsLoader: AssetsLoaderService) {}

  ngOnInit() {
    this.assetsLoader.loadScript(
      'assets/plugins/summernote/summernote-lite.min.js'
    );
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
    this.assetsLoader.unloadScript(
      'assets/plugins/summernote/summernote-lite.min.js'
    );
  }
}
