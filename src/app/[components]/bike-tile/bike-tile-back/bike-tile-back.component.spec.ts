import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeTileBackComponent } from './bike-tile-back.component';

describe('BikeTileBackComponent', () => {
  let component: BikeTileBackComponent;
  let fixture: ComponentFixture<BikeTileBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BikeTileBackComponent]
    });
    fixture = TestBed.createComponent(BikeTileBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
