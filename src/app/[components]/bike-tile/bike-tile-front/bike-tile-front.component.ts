import { Component, Input } from '@angular/core';
import { Bike } from 'src/app/[models]/Bike';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-bike-tile-front',
  templateUrl: './bike-tile-front.component.html',
  styleUrls: ['./bike-tile-front.component.scss']
})
export class BikeTileFrontComponent {
  @Input() bike!: Bike;
  imageUrl = '';
  imageDownloaded = false;

  ngOnChanges() {
  }

  downloadImage() {
    const storage = getStorage();
    getDownloadURL(ref(storage, this.bike.image))
      .then((url) => {
        this.imageUrl = url;
      })
  }
}
