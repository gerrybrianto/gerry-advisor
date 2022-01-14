import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Restaurant } from '../restaurant-list/restaurants.model';

export const selectRestaurants =
  createFeatureSelector<ReadonlyArray<Restaurant>>('restaurants');

export const selectCollectionState =
  createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectRestaurantCollection = createSelector(
  selectRestaurants,
  selectCollectionState,
  (restaurants, collection) => {
    return collection.map((id) =>
      restaurants.find((restaurant) => restaurant.id === id)
    );
  }
);
