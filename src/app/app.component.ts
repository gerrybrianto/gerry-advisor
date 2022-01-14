import { Component, OnInit } from '@angular/core';
import Restaurants from '../assets/restaurants.json';
import { Restaurant } from './restaurant-list/restaurants.model';

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
  restaurants$ = this.store.select(selectRestaurants);
  restaurantCollection$ = this.store.select(selectRestaurantCollection);

  onAdd(restaurantId: string) {
    this.store.dispatch(addRestaurant({ restaurantId }));
  }

  onRemove(restaurantId: string) {
    this.store.dispatch(removeRestaurant({ restaurantId }));
  }

  constructor() {
    this.googleMapOptions = {};
    this.map = google.maps.Map;
    this.infoWindow = google.maps.InfoWindow;
  }
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.setMapPos(pos);
          console.log(this.googleMapOptions);
        },
        () => {
          this.handleLocationError(
            true,
            this.infoWindow,
            this.map.getCenter()!
          );
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
    }
  }

  zoomOnRestaurant(restaurant: Restaurant): void {
    const pos = {
      lat: restaurant.lat,
      lng: restaurant.long,
    };
    this.setMapPos(pos);
    console.log('gMapOptions: ', this.googleMapOptions);
  }

  setMapPos(pos: { lat: number; lng: number }): void {
    this.googleMapOptions = {
      center: { lat: pos.lat, lng: pos.lng },
      zoom: 19,
    };
  }

  restaurantRatingsAvg(ratings: { stars: number; comment: string }[]): number {
    const ratingsStarArr: number[] = [];
    ratings.forEach((rating) => ratingsStarArr.push(rating.stars));
    return this.arrayAvg(ratingsStarArr);
  }

  arrayAvg(arr: number[]): number {
    return arr.reduce((a, b) => a + b) / arr.length;
  }

  handleLocationError(
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
}
