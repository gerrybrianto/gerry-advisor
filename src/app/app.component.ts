import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Rating, Restaurant } from './restaurant-list/restaurants.model';
import { GooglePlacesService } from './restaurant-list/restaurants.service';
import { addRestaurant, removeRestaurant } from './store/restaurants.actions';
import { selectRestaurants } from './store/restaurants.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gerry-advisor';
  googleMapOptions: google.maps.MapOptions;
  map: any;
  mapHeight: string;
  mapWidth: string;
  infoWindow: any;
  restaurants$: Observable<readonly Restaurant[] | null>;
  restaurantsWithRatings$: Observable<
    { restaurant: Restaurant; ratings: Rating[] }[]
  >;
  markerInfos: { titles: string[]; positions: google.maps.LatLngLiteral[] };
  markerOptions: google.maps.MarkerOptions;
  currentPosition: { lat: number; lng: number };
  restaurantsSubscriptions: Subscription;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mapHeight = `${window.innerHeight - 80}px`;
    this.mapWidth = `${window.innerWidth - 400}px`;
  }

  constructor(
    private store: Store,
    private restaurantsService: GooglePlacesService
  ) {
    this.googleMapOptions = {};
    this.map = google.maps.Map;
    this.infoWindow = google.maps.InfoWindow;
    this.restaurants$ = this.store.select(selectRestaurants);
    this.restaurantsWithRatings$ = new Observable();
    this.markerInfos = { titles: [], positions: [] };
    this.markerOptions = { draggable: false };
    this.currentPosition = { lat: 0, lng: 0 };
    this.restaurantsSubscriptions = new Subscription();
    this.mapHeight = `${window.innerHeight - 80}px`;
    this.mapWidth = `${window.innerWidth - 400}px`;
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.currentPosition = pos;
          this.setMapPos(pos, 15);
          this.refreshRestaurantsList(null, pos);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
    }
  }

  onAdd(restaurantId: string): void {
    this.store.dispatch(addRestaurant({ restaurantId }));
  }

  onRemove(restaurantId: string): void {
    this.store.dispatch(removeRestaurant({ restaurantId }));
  }

  zoomOnRestaurant(restaurant: Restaurant): void {
    const pos = {
      lat: restaurant.lat,
      lng: restaurant.long,
    };
    this.setMapPos(pos, 18);
    console.log('gMapOptions: ', this.googleMapOptions);
  }

  resetPos(): void {
    this.setMapPos(this.currentPosition, 15);
  }

  setMapPos(pos: { lat: number; lng: number }, zoom: number): void {
    this.googleMapOptions = {
      center: { lat: pos.lat, lng: pos.lng },
      zoom: zoom,
    };
  }

  setcurrentPosition(
    event: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ) {
    this.currentPosition = {
      lat: event.latLng ? event.latLng.lat() : 0,
      lng: event.latLng ? event.latLng.lng() : 0,
    };
    console.log('clicked position: ', this.currentPosition);
  }

  setRestaurantMarkersInfos(restaurant: Restaurant): void {
    this.markerInfos.positions.push({
      lat: restaurant.lat,
      lng: restaurant.long,
    });
    this.markerInfos.titles.push(restaurant.restaurantName);
  }

  addMarker(marker: { pos: google.maps.LatLngLiteral; title?: string }) {
    if (marker.title) {
      this.markerInfos.titles.push(marker.title);
    }
    this.markerInfos.positions.push(marker.pos);
    console.log('new marker: ', marker.title, marker.pos);
  }

  refreshRestaurantsList(
    event: google.maps.MapMouseEvent | google.maps.IconMouseEvent | null,
    pos?: { lat: number; lng: number }
  ): void {
    if (event) {
      this.setcurrentPosition(event);
    }
    this.restaurantsSubscriptions.unsubscribe();
    this.restaurantsWithRatings$ = this.restaurantsService
      .getRestaurants(pos ? pos : this.currentPosition)
      .pipe(
        map((restaurants) =>
          restaurants.map((restaurant) => this.getRestaurantRatings(restaurant))
        ),
        switchMap((restaurantsWithRatings$) =>
          forkJoin(restaurantsWithRatings$)
        )
      );
    this.restaurantsSubscriptions = this.restaurantsWithRatings$.subscribe(
      (restaurantsWithRatings) => {
        this.markerInfos = { titles: [], positions: [] };
        restaurantsWithRatings.map((restaurantWithRatings) => {
          this.setRestaurantMarkersInfos(restaurantWithRatings.restaurant);
        });
      }
    );
  }

  addCustomRestaurant(restaurant: Restaurant): void {}

  addCustomRating(): void {}

  private getRestaurantRatings(
    restaurant: Restaurant
  ): Observable<{ restaurant: Restaurant; ratings: Rating[] }> {
    return this.restaurantsService
      .getReviews(restaurant.id)
      .pipe(map((ratings) => ({ restaurant, ratings })));
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
}
