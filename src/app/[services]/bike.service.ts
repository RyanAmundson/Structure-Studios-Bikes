import { Injectable, inject } from '@angular/core';
import { FirebaseCrudService } from './firebase-crud.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DataSnapshot } from 'firebase/database';
import { Bike } from '../[models]/Bike';
import { getStorage, listAll, ref } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private basePath = '/bikes'; // Base path in Firebase for bikes

  private firebaseCrudService: FirebaseCrudService<Bike> = inject(FirebaseCrudService);

  filterMap$ = new BehaviorSubject<Map<string, string[]>>(new Map());


  createBike(bike: Bike): Promise<void> {
    return this.firebaseCrudService.createItem(this.basePath, bike);
  }

  createBikes(bikes: Bike[]): Promise<void[]> {
    return Promise.all(bikes.map((bike) => this.createBike(bike)));
  }

  getBike(id: string): Promise<Bike> {
    const path = `${this.basePath}/${id}`;
    return this.firebaseCrudService.readOne(path).then((snapshot) => {
      return snapshot.val();
    });
  }

  updateBike(id: string, data: Partial<Bike>): Promise<void> {
    const path = `${this.basePath}/${id}`;
    return this.firebaseCrudService.updateItem(path, data);
  }

  deleteBike(id: string): Promise<void> {
    const path = `${this.basePath}/${id}`;
    return this.firebaseCrudService.deleteItem(path);
  }

  getBikes(offset: number, page: number): Observable<Bike[]> {
    console.log(offset, page)
    return this.firebaseCrudService.readPage(this.basePath, offset, page).pipe(
      map((bikes) => {
        return bikes;
      }),
      tap((bikes: Bike[]) => this.buildFilters(bikes))
    )
  }

  watchBikes(offset: number, page: number): Observable<Bike[]> {

    return this.firebaseCrudService.watchPage(this.basePath, offset, page).pipe(
      map((snapshot) => {
        const bikes: Bike[] = [];
        snapshot.forEach((childSnapshot) => {
          bikes.push(childSnapshot.snapshot.val());
        });
        return bikes;
      }));
  }


  stateChanges(offset: number, page: number) {
    return this.firebaseCrudService.watchStateChanges(this.basePath, offset, page)
  }


  fetchAllFilters(): any {
    return this.filterMap$.asObservable();
  }

  applyFilters(list: Bike[], activeFilters: Map<string, string[]>): any {
    if (Array.from(activeFilters?.values()).flat()?.length === 0) return list;
    return list.filter((item: Bike) => {
      return activeFilters.get("color")?.includes(item.color) ? true : false ||
        activeFilters.get("material")?.includes(item.material) ? true : false ||
          activeFilters.get("type")?.includes(item.type) ? true : false
    })
  }

  buildFilters(bikes: Partial<Bike[]>): any {
    let filterMap = new Map();

    let colors: string[] = [];
    let materials: string[] = [];
    let types: string[] = [];
    bikes.forEach((bike: any) => {
      if (bike?.color) colors.push(bike?.color);
      if (bike?.material) materials.push(bike?.material);
      if (bike?.type) types.push(bike?.type);
    });
    filterMap.set('color', colors);
    filterMap.set('material', materials);
    filterMap.set('type', types);

    this.filterMap$.next(filterMap);
  }



  createTestBikes(count: number) {

    const storageUrl = "bike-photos/";
    const bikes: Bike[] = [];
    for (let i = 1; i <= count; i++) {
      bikes.push({
        "timestamp": Date.now(),
        "id": "bike" + i,
        "make": "Make " + i,
        "model": "Model " + i,
        "type": "Type " + i,
        "frameSize": "Frame Size " + i,
        "wheelSize": i,
        "color": "Color " + i,
        "material": "Material " + i,
        "brakeType": "Brake Type " + i,
        "suspension": "Suspension " + i,
        "gears": i,
        "weight": i,
        "dimensions": "Dimensions " + i,
        "price": i,
        "stock": i,
        "description": "Description " + i,
        "features": ["Feature " + i],
        "warrantyPeriod": "Warranty Period " + i,
        "image": storageUrl + "bike" + i + ".png"
      });
    }
    this.createBikes(bikes);
  }

  deleteAll() {
    this.firebaseCrudService.deleteAll();
  }
}
