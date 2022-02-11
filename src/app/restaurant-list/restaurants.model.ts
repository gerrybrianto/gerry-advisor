export interface Restaurant {
  id: string;
  restaurantName: string;
  address: string;
  lat: number;
  long: number;
  avgRating: number;
}

export type Rating = {
  stars: number;
  comment: string;
};
