import { Restaurant } from '../restaurant-list/restaurants.model';

export interface AppState {
  restaurants: ReadonlyArray<Restaurant>;
  collection: ReadonlyArray<string>;
}
