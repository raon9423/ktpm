import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { AssetsLoaderService } from "../../services/assets-loader";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit, OnDestroy {
  constructor(private assetsLoader: AssetsLoaderService) {}
  ngOnInit() {
    this.assetsLoader.loadScript('assets/js/circle-progress.min.js');
    this.assetsLoader.loadScript('assets/js/script.js');
  }
  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/circle-progress.min.js');
    this.assetsLoader.unloadScript('assets/js/script.js');
  }

}
