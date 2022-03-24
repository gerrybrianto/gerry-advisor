import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantImageComponent } from './restaurant-image.component';

describe('RestaurantImageComponent', () => {
  let component: RestaurantImageComponent;
  let fixture: ComponentFixture<RestaurantImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
