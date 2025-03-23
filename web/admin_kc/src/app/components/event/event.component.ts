import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AssetsLoaderService } from '../../services/assets-loader';
import { ExtracurricularActivitiesService } from '../../services/extracurricular-activities.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [ExtracurricularActivitiesService] // Add this line
})
export class EventComponent implements OnInit, OnDestroy {
  activities: any[] = [];

  constructor(
    private assetsLoader: AssetsLoaderService,
    private extraActivitiesService: ExtracurricularActivitiesService
  ) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/js/moment.min.js');
    this.assetsLoader.loadScript('assets/js/bootstrap-datetimepicker.min.js');
    this.assetsLoader.loadScript('assets/js/jquery-ui.min.js');
    this.assetsLoader.loadScript(
      'assets/plugins/fullcalendar/fullcalendar.min.js'
    );
    this.assetsLoader.loadScript(
      'assets/plugins/fullcalendar/jquery.fullcalendar.js'
    );
    this.assetsLoader.loadScript('assets/js/script.js');
    this.extraActivitiesService.getActivities().subscribe((data: any) => {
      this.activities = data;
      console.log('Activities:', data);
    });
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/moment.min.js');
    // ...existing code...
    this.assetsLoader.unloadScript('assets/js/bootstrap-datetimepicker.min.js');
    this.assetsLoader.unloadScript('assets/js/jquery-ui.min.js');
    this.assetsLoader.unloadScript(
      'assets/plugins/fullcalendar/fullcalendar.min.js'
    );
    this.assetsLoader.unloadScript(
      'assets/plugins/fullcalendar/jquery.fullcalendar.js'
    );
    this.assetsLoader.unloadScript('assets/js/script.js');
  }
}