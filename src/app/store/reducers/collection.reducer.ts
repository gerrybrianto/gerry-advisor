import { createReducer, on } from '@ngrx/store';
import { addRestaurant, removeRestaurant } from '../restaurants.actions';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  initialState,
  on(removeRestaurant, (state, { restaurantId }) =>
    state.filter((id) => id !== restaurantId)
  ),
  on(addRestaurant, (state, { restaurantId }) => {
    if (state.indexOf(restaurantId) > -1) return state;

    return [...state, restaurantId];
  })
);
