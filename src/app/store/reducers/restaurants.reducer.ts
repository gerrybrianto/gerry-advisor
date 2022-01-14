import { createReducer, on } from '@ngrx/store';

import { retrievedRestaurantList } from '../restaurants.actions';
import { Restaurant } from '../../restaurant-list/restaurants.model';

export const initialState: ReadonlyArray<Restaurant> = [];

export const restaurantsReducer = createReducer(
  initialState,
  on(retrievedRestaurantList, (state, { restaurants }) => restaurants)
);
