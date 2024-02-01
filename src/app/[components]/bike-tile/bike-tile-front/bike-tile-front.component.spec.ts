import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeTileComponent } from './bike-tile-front.component';

describe('BikeTileComponent', () => {
  let component: BikeTileComponent;
  let fixture: ComponentFixture<BikeTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BikeTileComponent]
    });
    fixture = TestBed.createComponent(BikeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
