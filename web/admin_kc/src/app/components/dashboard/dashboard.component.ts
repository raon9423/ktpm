import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AssetsLoaderService } from '../../services/assets-loader';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private assetsLoader: AssetsLoaderService) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
  }
}
