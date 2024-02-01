import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeTileActionBarComponent } from './bike-tile-action-bar.component';

describe('BikeTileActionBarComponent', () => {
  let component: BikeTileActionBarComponent;
  let fixture: ComponentFixture<BikeTileActionBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BikeTileActionBarComponent]
    });
    fixture = TestBed.createComponent(BikeTileActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
