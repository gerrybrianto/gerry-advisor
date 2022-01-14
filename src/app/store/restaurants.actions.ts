import { createAction, props } from '@ngrx/store';
import { Restaurant } from '../restaurant-list/restaurants.model';

export const addRestaurant = createAction(
  '[Restaurant List] Add Restaurant',
  props<{ restaurantId: string }>()
);

export const removeRestaurant = createAction(
  '[Restaurant Collection] Remove Restaurant',
  props<{ restaurantId: string }>()
);

export const retrievedRestaurantList = createAction(
  '[Restaurant List/API] Retrieve Restaurants Success',
  props<{ restaurants: ReadonlyArray<Restaurant> }>()
);
