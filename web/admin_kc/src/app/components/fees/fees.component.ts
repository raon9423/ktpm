import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsLoaderService } from '../../services/assets-loader';
@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [],
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.css',
})
export class FeesComponent implements OnInit, OnDestroy {
  constructor(private assetsLoader: AssetsLoaderService) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/plugins/datatables/datatables.min.js');
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
    this.assetsLoader.unloadScript(
      'assets/plugins/datatables/datatables.min.js'
    );
  }
}
