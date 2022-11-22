import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Rating, Restaurant } from './restaurants.model';
import { ResponseApi, Result } from '../interfaces/responseApi';
import { ResponseApiDetails, Review } from '../interfaces/responseApiDetails';

@Injectable({ providedIn: 'root' })
export class GooglePlacesService {
  apiKey: string = encodeURI('AIzaSyBfDKj0MwI25FL2Az1aJEqO4frIsonndcg');
  signature: string = encodeURI('kHqEETujCds8Pl7uA_XQg6LPAA4=');
  requestCorsOption = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private http: HttpClient) {}

  getRestaurants(pos: {
    lat: number | undefined;
    lng: number | undefined;
  }): Observable<Restaurant[]> {
    const apiURL = `http://localhost:4200/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1500&type=restaurant|cafe|food|meal_delivery|meal_takeaway&key=${this.apiKey}`;
    return this.http.get<ResponseApi>(apiURL, this.requestCorsOption).pipe(
      map((response: ResponseApi) =>
        response.results.map((result: Result): Restaurant => {
          return {
            id: result.place_id,
            restaurantName: result.name,
            address: result.vicinity,
            lat: result.geometry.location.lat,
            long: result.geometry.location.lng,
            avgRating: result.rating,
          } as Restaurant;
        })
      )
    );
  }

  getReviews(id: string): Observable<Rating[]> {
    const apiURL = `http://localhost:4200/api/place/details/json?fields=rating,review&place_id=${id}&key=${this.apiKey}`;
    return this.http
      .get<ResponseApiDetails>(apiURL, this.requestCorsOption)
      .pipe(
        map((response: ResponseApiDetails) => {
          if (response.result?.reviews) {
            return response.result.reviews.map((review: Review) => {
              return {
                stars: review.rating,
                comment: review.text,
              } as Rating;
            });
          } else {
            return [];
          }
        })
      );
  }

  getStreetViewImage(pos: { lat: number; lng: number }): Observable<Blob> {
    const apiURL = `http://localhost:4200/api/streetview?size=84x88&location=${pos.lat},${pos.lng}&fov=80&heading=70&pitch=0&key=${this.apiKey}`;
    return this.http.get(apiURL, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }
}
