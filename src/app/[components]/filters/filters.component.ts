import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { BikeService } from 'src/app/[services]/bike.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  @Input() count:number = 0;
  @Output() filterChange = new EventEmitter<any>();

  public bikes: BikeService = inject(BikeService);

  filters$:Promise<Map<string, string[]>> = Promise.resolve(new Map());

  activeFilters = new Map();

  ngOnInit() {
    this.filters$ = this.bikes.fetchAllFilters();
  }

  filterChanged(event: any, category:string) {
    this.activeFilters.set(category, event.value);
    this.filterChange.emit(this.activeFilters);
  }

}
