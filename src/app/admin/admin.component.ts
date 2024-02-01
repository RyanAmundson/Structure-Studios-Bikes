import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { concatMap, debounce, distinctUntilChanged, filter, map, scan, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, combineLatest, defer, fromEvent, of, timer } from 'rxjs';

import { HeaderService } from '../[services]/header.service';
import { BikeService } from '../[services]/bike.service';
import { Bike } from '../[models]/Bike';
import { TileLayout } from '../[models]/models';
import { MatDialog } from '@angular/material/dialog';
import { AddBikeFormComponent } from '../[components]/add-bike-form/add-bike-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  private bikes: BikeService = inject(BikeService);
  private headerService: HeaderService = inject(HeaderService);
  public dialog: MatDialog = inject(MatDialog);

  @ViewChild('feedList', { static: true, read: ElementRef }) feedList!: ElementRef;

  allBikes$: Observable<Bike[]> = of([]);
  filteredBikes$: Observable<Bike[]> = of([]);
  page$ = new Subject<number>();
  currentPage = 0;
  itemsPerPage = 12;
  loading = signal(true);
  showScrollToTop = false;

  activeFilters$ = new BehaviorSubject<Map<string, string[]>>(new Map());


  masonryConfig = {
    enableFlipping: true,
    enableExpand: true,
    enableHover: true,
    layout: {
      cols: 1,
      rows: 1,
    }
  }

  ngOnInit(): void {
    this.page$ = new Subject<number>();
    this.allBikes$ = this.page$.pipe(
      startWith(0),
      tap(() => this.loading.set(true)),
      switchMap((num: number) => this.bikes.getBikes(this.itemsPerPage * (num + 1), 0)),
      tap(() => this.currentPage++),
      shareReplay(1)
    );


    this.filteredBikes$ = combineLatest([this.allBikes$, this.activeFilters$]).pipe(
      map(([posts, filters]: [Bike[], Map<string, string[]>]) => this.bikes.applyFilters(posts, filters)),
      tap(() => this.loading.set(false)),
      shareReplay(1),
    );


  }

  ngAfterViewInit(): void {
    fromEvent(this.feedList.nativeElement, 'scroll').pipe(
      tap((e: any) => e.target.scrollTop !== 0 ? this.scrollAtTop(false) : this.scrollAtTop(true)),
      map((e: any) => [e.target.scrollTop, e.target.scrollHeight, e.target.offsetHeight]),
      filter(this.onScrollBottom),
      tap(() => this.loading.set(true)),
      distinctUntilChanged(),
      debounce(() => timer(3000)),
    ).subscribe(() => {
      this.page$.next(this.currentPage);
    });
  }

  scrollAtTop(isAtTop: boolean): void {
    if (isAtTop) {
      this.headerService.show();
      this.showScrollToTop = false;
    } else {
      this.headerService.hide();
      this.showScrollToTop = true;
    }
  }

  private onScrollBottom([scrollTop, scrollHeight, offsetHeight]: any[]): boolean {
    let pos = scrollTop + offsetHeight;
    let max = scrollHeight;
    return pos > max - 200;
  }

  backToTop(): void {
    this.feedList.nativeElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  openAddBikeDialog(): void {
    const dialogRef = this.dialog.open(AddBikeFormComponent, {
      width: '600px',
      height: '800px',
      data: {},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result when the dialog is closed
      if (result) {
        this.bikes.createBike(result).then(() => {
          console.log('Bike added');
        });
      }
    });
  }

  updateActiveFilters(filters: Map<string, string[]>): void {
    this.activeFilters$.next(filters);
  }

  createBikes(num = 5): void {
    this.bikes.createTestBikes(num);
  }

  clearAll(): void {
    this.bikes.deleteAll();
  }

}
