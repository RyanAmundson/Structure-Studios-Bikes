import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-masonry-tile',
  templateUrl: './masonry-tile.component.html',
  styleUrls: ['./masonry-tile.component.scss'],
  animations: [
    trigger('grow', [

      transition('false => true', [
        style({ height: '0', overflow: 'hidden' }), // Initial state
        animate('0.2s ease-in', style({ height: '*', overflow: 'hidden' })) // Final state
      ]),

      transition('true => *', [
        style({ height: '*', overflow: 'hidden' }), // Initial state
        animate('0.2s ease-out', style({ height: '0', overflow: 'hidden' })) // Final state
      ])
    ])
  ]
})
export class MasonryTileComponent {
  @Input() content: any;
  @Input() id: any;
  @Input() expanded: boolean = false;
  @Input() enableHover: boolean = false;
  @Output() expandedChange: EventEmitter<any> = new EventEmitter();

  flipped = signal(false);
  noImage = signal(false);

  hover = signal(false);


  flip() {
    this.flipped.set(!this.flipped());
  }

  togglehover(hover: boolean) {
    if (hover && this.hover()) {
      return;
    }
    if (this.hover()) {
      setTimeout(() => {
        this.hover.set(!this.hover());
      }, 500);
    } else {
      this.hover.set(!this.hover());
    }
  }

  expand(event: any) {
    event.stopPropagation();
    this.expandedChange.emit(this.id);
    setTimeout(() => {
      event.target.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
    }, 500)
    this.expanded = true;
  }

  imageError() {
    this.noImage.set(true);
  }
}
