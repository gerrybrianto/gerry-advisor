import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from './restaurants.model';
import Restaurants from '../../assets/restaurants.json';

@Injectable({ providedIn: 'root' })
export class GooglePlacesService {
  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Array<Restaurant>> {
    const apiURL = `https://localhost:4200/assets/restaurants.json`;
    return this.http
      .get<{ items: Restaurant[] }>(apiURL)
      .pipe(map((restaurants) => restaurants.items || []));
  }
}
