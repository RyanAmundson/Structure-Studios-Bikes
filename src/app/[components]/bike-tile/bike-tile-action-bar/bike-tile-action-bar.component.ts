import { Component, Input, inject } from '@angular/core';
import { Bike } from 'src/app/[models]/Bike';
import { BikeService } from 'src/app/[services]/bike.service';
import { AddBikeFormComponent } from '../../add-bike-form/add-bike-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bike-tile-action-bar',
  templateUrl: './bike-tile-action-bar.component.html',
  styleUrls: ['./bike-tile-action-bar.component.scss']
})
export class BikeTileActionBarComponent {
  @Input() bike!: Bike;

  public dialog: MatDialog = inject(MatDialog);
  public bikes: BikeService = inject(BikeService);



  edit(bike: Bike = this.bike) {
    const dialogRef = this.dialog.open(AddBikeFormComponent, {
      width: '80vw',
      height: '80vh',
      data: bike,
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result when the dialog is closed
      if (result) {
        this.bikes.updateBike(result.id, result);
      }
    });
  }


  remove(bike: Bike = this.bike) {
    this.bikes.deleteBike(bike.id).then(() => {
      console.log('Bike removed: ', bike.id);
    })
  }


}
