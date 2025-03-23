import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AssetsLoaderService } from '../../services/assets-loader';
import { SchedulesService } from '../../services/schedules.service';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css',
})
export class SubjectsComponent implements OnInit, OnDestroy {
  schedules: any[] = [];

  constructor(
    private assetsLoader: AssetsLoaderService,
    private schedulesService: SchedulesService
  ) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/plugins/datatables/datatables.min.js');
    this.assetsLoader.loadScript('assets/js/script.js');

    this.schedulesService.getAllSchedules().subscribe((data) => {
      this.schedules = data;
      console.log('Schedules:', data);
    });
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
    this.assetsLoader.unloadScript('assets/plugins/datatables/datatables.min.js');
  }
}