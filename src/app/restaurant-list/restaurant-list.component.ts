import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Rating, Restaurant } from './restaurants.model';
import { GooglePlacesService } from './restaurants.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  @Input() restaurantsWithRatings: ReadonlyArray<{
    restaurant: Restaurant;
    ratings: Rating[];
  }> | null;
  @Output() add: EventEmitter<string>;
  @Output() zoomOnRestaurant: EventEmitter<Restaurant>;
  listState: 'list' | 'focus';
  minRating: FormControl;
  maxRating: FormControl;
  customRestaurants: Restaurant[];
  customRatings: {
    [restaurantId: string]: Rating[];
  };
  focusOnRestaurant: boolean[];
  focusedRestaurant: Partial<Restaurant>;

  constructor(public googlePlacesService: GooglePlacesService) {
    this.restaurantsWithRatings = [];
    this.add = new EventEmitter();
    this.zoomOnRestaurant = new EventEmitter();
    this.minRating = new FormControl(0, [Validators.min(0), Validators.max(5)]);
    this.maxRating = new FormControl(5, [Validators.min(0), Validators.max(5)]);
    this.customRestaurants = [];
    this.customRatings = {};
    this.listState = 'list';
    this.focusOnRestaurant = [];
    this.focusedRestaurant = {};
  }

  ngOnInit(): void {
    this.restaurantsWithRatings?.forEach(() =>
      this.focusOnRestaurant.push(false)
    );
  }

  filterRestaurant(restaurant: Restaurant): boolean {
    if (
      restaurant.avgRating >= this.minRating.value &&
      restaurant.avgRating <= this.maxRating.value
    )
      return true;
    return false;
  }

  addCustomRestaurant(newRestaurant: Restaurant) {
    this.customRestaurants.push(newRestaurant);
  }

  selectRestaurant(i: number, restaurant: Restaurant) {
    this.focusOnRestaurant[i] = !this.focusOnRestaurant[i];
    if (this.focusOnRestaurant[i]) {
      this.listState = 'focus';
      this.focusedRestaurant = restaurant;
    } else {
      this.listState = 'list';
      this.focusedRestaurant = {};
    }
    this.zoomOnRestaurant.emit(restaurant);
  }
}
