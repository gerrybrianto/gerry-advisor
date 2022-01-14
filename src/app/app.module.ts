import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { restaurantsReducer } from './store/reducers/restaurants.reducer';
import { collectionReducer } from './store/reducers/collection.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

@NgModule({
  declarations: [AppComponent, RestaurantListComponent],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      restaurants: restaurantsReducer,
      collection: collectionReducer,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
