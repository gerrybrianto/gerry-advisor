import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { restaurantsReducer } from './store/reducers/restaurants.reducer';
import { collectionReducer } from './store/reducers/collection.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantCollectionComponent } from './restaurant-collection/restaurant-collection.component';
import { GooglePlacesService } from './restaurant-list/restaurants.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantImageComponent } from './restaurant-list/restaurant-image/restaurant-image.component';
import { AddRestaurantComponent } from './restaurant-list/add-restaurant/add-restaurant.component';
import { AddRatingComponent } from './restaurant-list/display-ratings/add-rating/add-rating.component';
import { DisplayRatingsComponent } from './restaurant-list/display-ratings/display-ratings.component';
import { RatingsStarsComponent } from './restaurant-list/ratings-stars/ratings-stars.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantCollectionComponent,
    RestaurantImageComponent,
    AddRestaurantComponent,
    AddRatingComponent,
    DisplayRatingsComponent,
    RatingsStarsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      restaurants: restaurantsReducer,
      collection: collectionReducer,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [GooglePlacesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
