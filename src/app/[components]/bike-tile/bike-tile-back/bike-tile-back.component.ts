import { Component, Input } from '@angular/core';
import { Bike } from 'src/app/[models]/Bike';

@Component({
  selector: 'app-bike-tile-back',
  templateUrl: './bike-tile-back.component.html',
  styleUrls: ['./bike-tile-back.component.scss']
})
export class BikeTileBackComponent {
  @Input() bike: Bike = {} as Bike;
}
