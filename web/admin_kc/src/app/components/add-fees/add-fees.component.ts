import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsLoaderService } from '../../services/assets-loader';
@Component({
  selector: 'app-add-fees',
  standalone: true,
  imports: [],
  templateUrl: './add-fees.component.html',
  styleUrl: './add-fees.component.css',
})
export class AddFeesComponent implements OnInit, OnDestroy {
  constructor(private assetsLoader: AssetsLoaderService) {}

  ngOnInit() {
    this.assetsLoader.loadScript(
      'assets/plugins/slimscroll/jquery.slimscroll.min.js'
    );
    this.assetsLoader.loadScript('assets/plugins/select2/js/select2.min.js');
    this.assetsLoader.loadScript('assets/plugins/moment/moment.min.js');
    this.assetsLoader.loadScript('assets/js/bootstrap-datetimepicker.min.js');
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript(
      'assets/plugins/slimscroll/jquery.slimscroll.min.js'
    );
    this.assetsLoader.unloadScript('assets/plugins/select2/js/select2.min.js');
    this.assetsLoader.unloadScript('assets/plugins/moment/moment.min.js');
    this.assetsLoader.unloadScript('assets/js/bootstrap-datetimepicker.min.js');
    this.assetsLoader.unloadScript('assets/js/script.js');
  }
}
