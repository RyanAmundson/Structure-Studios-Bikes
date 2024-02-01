import { Component, Input, signal } from '@angular/core';
import { Bike } from 'src/app/[models]/Bike';

@Component({
  selector: 'app-bike-tile',
  templateUrl: './bike-tile.component.html',
  styleUrls: ['./bike-tile.component.scss']
})
export class BikeTileComponent {

    @Input() bike!: Bike;


    flipped = signal(false);
   
    flip() {
      this.flipped.set(!this.flipped());
    }
  
}
