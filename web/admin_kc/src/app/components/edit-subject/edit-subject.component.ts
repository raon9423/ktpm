import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsLoaderService } from '../../services/assets-loader';
@Component({
  selector: 'app-edit-subject',
  standalone: true,
  imports: [],
  templateUrl: './edit-subject.component.html',
  styleUrl: './edit-subject.component.css',
})
export class EditSubjectComponent implements OnInit, OnDestroy {
  constructor(private assetsLoader: AssetsLoaderService) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
  }
}
