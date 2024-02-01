import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, map, max, of, tap } from 'rxjs';
import { TileLayout, Tile } from 'src/app/[models]/models';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss'],
  animations: [
    trigger('fade', [
      transition('* => *', [ // or use ':enter' if the container itself doesn't enter or leave
        query(':enter', [
          style({ opacity: 0 }),
          stagger('100ms', animate('0.3s ease-in', style({ opacity: 1 })))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          stagger('100ms', animate('0.3s ease-in', style({ opacity: 0 })))
        ], { optional: true })
      ])
    ])
  ]
})
export class MasonryComponent<T> {
  /**
   * Dependencies
   */
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * I/O
   */
  @Input() content: T[] = [];
  @Input() public frontFaceTemplate: any;
  @Input() public backFaceTemplate: any;
  @Input() public actionBarTemplate: any;
  @Input() layout: TileLayout[] = [
    { cols: 2, rows: 2 },
    { cols: 2, rows: 3 },
    { cols: 2, rows: 3 },
    { cols: 2, rows: 2 },
    { cols: 1, rows: 2 },
    { cols: 3, rows: 2 },
  ];
  @Input() gutterSize = '5px';

  @Input() config: any = {
    enableFlipping: false,
    enableExpand: false,
    layout: {
      cols: 2,
      rows: 2,
    }
  }
  /**
   * Properties
   */
  // No space for multi column on mobile
  phoneLayout: TileLayout = { cols: 1, rows: 2 };
  maxColumns = 4;
  columns$ = new BehaviorSubject(this.maxColumns);
  rowHeight = '400px';
  tiles: (T & Tile)[] = [];


  constructor() {
    // Adjust columns when screen changes
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
      distinctUntilChanged(),
      map((results) => results.breakpoints[Breakpoints.HandsetPortrait] ? 1 : results.breakpoints[Breakpoints.TabletPortrait] ? 2 : this.maxColumns)
    ).subscribe((columns) => {
      this.columns$.next(columns);
      this.tiles = this.process(this.tiles, columns);
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.tiles = this.process(<(T & Tile)[]>this.content, this.columns$.value);
  }

  trackBy(index: any, tile: any) {
    return tile.id;
  }

  toggleExpand(tile: Tile, shrink: boolean) {
    if (this.config.enableExpand === false) return;
    if (shrink) {
      tile.expanded = false;
      tile.cols = tile.originalLayout.cols;
      tile.rows = tile.originalLayout.rows;
    } else {
      tile.expanded = true;
      tile.cols = Math.min(this.columns$.value, 2);
      tile.rows = Math.min(this.columns$.value, 2);
    }
  }


  process(tiles: (T & Tile)[], columns: number): (T & Tile)[] {
    if (tiles === undefined || tiles === null) return [];
    return tiles.map((tile: (T & Tile), index: number) => {
      if (columns === 1) {
        tile = { ...tile, ...this.phoneLayout, ...{ originalLayout: this.phoneLayout } };
        return tile;
      } else {
        const layoutIndex = index % this.layout.length;
        const layout = this.layout[layoutIndex];
        const adjustedLayout = { cols: Math.min(columns, layout.cols), rows: layout.rows };
        tile = {
          ...tile, ...adjustedLayout, ...{ originalLayout: layout }
        };
        return tile;
      }
    })
  }
}
