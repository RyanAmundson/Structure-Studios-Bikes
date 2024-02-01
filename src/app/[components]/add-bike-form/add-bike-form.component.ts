import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bike } from 'src/app/[models]/Bike';

@Component({
  selector: 'app-add-bike-form',
  templateUrl: './add-bike-form.component.html',
  styleUrls: ['./add-bike-form.component.scss']
})
export class AddBikeFormComponent {
  bikeForm: FormGroup = new FormGroup({});
  isEdit = false;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddBikeFormComponent>, @Inject(MAT_DIALOG_DATA) bike: Bike) {
    this.createForm(bike);
  }

  createForm(bikeToEdit?: Bike) {
    if(bikeToEdit) this.isEdit = true;
    this.bikeForm = this.fb.group({
      id: [bikeToEdit?.id ?? '', []],
      make: [bikeToEdit?.make ?? '', [Validators.required]],
      model: [bikeToEdit?.model ?? '', [Validators.required]],
      type: [bikeToEdit?.type ?? '', []],
      frameSize: [bikeToEdit?.frameSize ?? '', []],
      wheelSize: [bikeToEdit?.wheelSize ?? '', [Validators.min(1)]],
      color: [bikeToEdit?.color ?? '', []],
      material: [bikeToEdit?.material ?? '', []],
      brakeType: [bikeToEdit?.brakeType ?? '', []],
      suspension: [bikeToEdit?.suspension ?? '', []],
      gears: [bikeToEdit?.gears ?? '', [, Validators.min(1)]],
      weight: [bikeToEdit?.weight ?? '', [, Validators.min(0.1)]],
      dimensions: [bikeToEdit?.dimensions ?? '', []],
      price: [bikeToEdit?.price ?? '', [, Validators.min(1)]],
      stock: [bikeToEdit?.stock ?? 0, []],
      description: [bikeToEdit?.description ?? ''],
      features: this.fb.array(bikeToEdit?.features ?? []),
      warrantyPeriod: [bikeToEdit?.warrantyPeriod ?? '', []],
      image: [
        bikeToEdit?.image ?? 'bike-photos/bike1.png',
        [Validators.pattern('bike-photos/.+')],
      ],
    });
  }

  get featureControls() {
    return this.bikeForm.get('features') as any;
  }

  addFeature() {
    this.featureControls.insert(0, this.fb.control(''));
  }

  // Remove Feature
  removeFeature(index: number) {
    const featuresArray = this.bikeForm.get('features') as FormArray;
    featuresArray.removeAt(index);
  }

  onSubmit() {
    if (this.bikeForm.valid) {
      const newBike: Bike = this.bikeForm.value;
      this.dialogRef.close(newBike);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
