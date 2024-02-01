import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBikeFormComponent } from './add-bike-form.component';

describe('AddBikeFormComponent', () => {
  let component: AddBikeFormComponent;
  let fixture: ComponentFixture<AddBikeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBikeFormComponent]
    });
    fixture = TestBed.createComponent(AddBikeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
