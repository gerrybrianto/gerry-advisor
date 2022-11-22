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
  @Input() currentPosition: { lat: number; lng: number };
  @Input() restaurantsWithRatings: ReadonlyArray<{
    restaurant: Restaurant;
    ratings: Rating[];
  }> | null;
  @Input() showList: boolean;
  @Output() addMarker: EventEmitter<{
    pos: google.maps.LatLngLiteral;
    title?: string;
  }>;
  @Output() zoomOnRestaurant: EventEmitter<Restaurant>;
  @Output() resetPos: EventEmitter<void>;
  @Output() toggleList: EventEmitter<void>;

  listState: 'list' | 'focus';
  minRating: FormControl;
  maxRating: FormControl;
  customRestaurants: Restaurant[];
  customRatings: {
    [restaurantId: string]: Rating[];
  };
  //focusOnRestaurant: boolean[];
  focusedRestaurant: Partial<Restaurant>;
  focusedRatings: Rating[];

  constructor(public googlePlacesService: GooglePlacesService) {
    this.restaurantsWithRatings = [];
    this.addMarker = new EventEmitter();
    this.zoomOnRestaurant = new EventEmitter();
    this.resetPos = new EventEmitter();
    this.toggleList = new EventEmitter();
    this.minRating = new FormControl(0, [Validators.min(0), Validators.max(5)]);
    this.maxRating = new FormControl(5, [Validators.min(0), Validators.max(5)]);
    this.customRestaurants = [];
    this.customRatings = {};
    this.listState = 'list';
    // this.focusOnRestaurant = [];
    this.focusedRestaurant = {};
    this.focusedRatings = [];
    this.currentPosition = { lat: 0, lng: 0 };
    this.showList = true;
  }

  ngOnInit(): void {
    //this.restaurantsWithRatings?.forEach(() =>
    //  this.focusOnRestaurant.push(false)
    //);
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
    newRestaurant.lat = this.currentPosition.lat;
    newRestaurant.long = this.currentPosition.lng;
    this.customRestaurants.push(newRestaurant);
    this.addMarker.emit({
      pos: { lat: newRestaurant.lat, lng: newRestaurant.long },
      title: newRestaurant.restaurantName,
    });
  }

  addCustomRating(newRating: Rating) {
    if (this.focusedRestaurant.id) {
      if (this.customRatings[this.focusedRestaurant.id])
        this.customRatings[this.focusedRestaurant.id].push(newRating);
      else {
        this.customRatings[this.focusedRestaurant.id] = [];
        this.customRatings[this.focusedRestaurant.id].push(newRating);
      }
    }
    console.log('customRatings: ', this.customRatings);
  }

  selectRestaurant(restaurant: any, custom: boolean) {
    if (this.listState === 'list') {
      //this.focusOnRestaurant[i] = true;
      this.listState = 'focus';
      if (custom) {
        this.focusedRestaurant = restaurant;
        this.focusedRatings = this.customRatings[restaurant.id]
          ? this.customRatings[restaurant.id]
          : [];
        this.zoomOnRestaurant.emit(restaurant);
      } else {
        this.focusedRestaurant = restaurant.restaurant;
        this.focusedRatings = restaurant.ratings;
        this.zoomOnRestaurant.emit(restaurant.restaurant);
      }
    }
  }

  backToList() {
    this.listState = 'list';
    this.focusedRestaurant = {};
    this.focusedRatings = [];
    this.resetPos.emit();
  }
}
