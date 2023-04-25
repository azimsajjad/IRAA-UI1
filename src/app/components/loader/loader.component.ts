import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  show: boolean = false;

  constructor(private generalService: GeneralService) {}

  ngOnInit() {
    this.generalService.loaderEvent.subscribe((res: boolean) => {
      this.show = res;
    });
  }
}
