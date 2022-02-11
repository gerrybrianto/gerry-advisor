import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCollectionComponent } from './restaurant-collection.component';

describe('RestaurantCollectionComponent', () => {
  let component: RestaurantCollectionComponent;
  let fixture: ComponentFixture<RestaurantCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
