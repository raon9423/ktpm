import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AssetsLoaderService } from '../../services/assets-loader';
@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent implements OnInit, OnDestroy {
  constructor(private assetsLoader: AssetsLoaderService) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/plugins/simple-calendar/jquery.simple-calendar.js')
    this.assetsLoader.loadScript('assets/js/calander.js');
    this.assetsLoader.loadScript('assets/js/circle-progress.min.js');
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/plugins/simple-calendar/jquery.simple-calendar.js')
    this.assetsLoader.unloadScript('assets/js/calander.js');
    this.assetsLoader.unloadScript('assets/js/circle-progress.min.js');
    this.assetsLoader.unloadScript('assets/js/script.js');
  }
}
