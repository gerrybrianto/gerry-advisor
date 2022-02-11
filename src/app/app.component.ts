import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Rating, Restaurant } from './restaurant-list/restaurants.model';
import { GooglePlacesService } from './restaurant-list/restaurants.service';
import { addRestaurant, removeRestaurant } from './store/restaurants.actions';
import {
  selectRestaurantCollection,
  selectRestaurants,
} from './store/restaurants.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gerry-advisor';
  googleMapOptions: google.maps.MapOptions;
  map: any;
  infoWindow: any;
  restaurants$: Observable<readonly Restaurant[] | null>;
  restaurantsWithRatings$: Observable<
    { restaurant: Restaurant; ratings: Rating[] }[]
  >;
  restaurantCollection$: Observable<readonly (Restaurant | undefined)[]>;

  constructor(
    private store: Store,
    private restaurantsService: GooglePlacesService
  ) {
    this.googleMapOptions = {};
    this.map = google.maps.Map;
    this.infoWindow = google.maps.InfoWindow;
    this.restaurants$ = this.store.select(selectRestaurants);
    this.restaurantCollection$ = this.store.select(selectRestaurantCollection);
    this.restaurantsWithRatings$ = new Observable();
  }
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.setMapPos(pos, 19);
          this.restaurantsWithRatings$ = this.restaurantsService
            .getRestaurants(pos)
            .pipe(
              map((restaurants) => restaurants.map(this.getRestaurantRatings)),
              switchMap((restaurantsWithRatings$) =>
                forkJoin(restaurantsWithRatings$)
              )
            );
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
    }
  }

  onAdd(restaurantId: string) {
    this.store.dispatch(addRestaurant({ restaurantId }));
  }

  onRemove(restaurantId: string) {
    this.store.dispatch(removeRestaurant({ restaurantId }));
  }

  zoomOnRestaurant(restaurant: Restaurant): void {
    const pos = {
      lat: restaurant.lat,
      lng: restaurant.long,
    };
    this.setMapPos(pos, 10);
    console.log('gMapOptions: ', this.googleMapOptions);
  }

  setMapPos(pos: { lat: number; lng: number }, zoom: number): void {
    this.googleMapOptions = {
      center: { lat: pos.lat, lng: pos.lng },
      zoom: zoom,
    };
  }

  private handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ): void {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }

  private getRestaurantRatings(
    restaurant: Restaurant
  ): Observable<{ restaurant: Restaurant; ratings: Rating[] }> {
    return this.restaurantsService
      .getReviews(restaurant.id)
      .pipe(map((ratings) => ({ restaurant, ratings })));
  }
}
