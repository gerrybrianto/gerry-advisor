export interface Restaurant {
  id: string;
  restaurantName: string;
  address: string;
  lat: number;
  long: number;
  ratings: { stars: number; comment: string }[];
}
