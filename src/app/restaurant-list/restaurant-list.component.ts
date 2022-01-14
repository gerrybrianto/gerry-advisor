import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Restaurant } from './restaurants.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  @Input() restaurants: ReadonlyArray<Restaurant> = [];
  @Output() add: EventEmitter<string>;
  @Output() zoomOnRestaurant: EventEmitter<Restaurant>;
  @Output() restaurantRatingsAvg: EventEmitter<
    {
      stars: number;
      comment: string;
    }[]
  >;

  constructor() {
    this.add = new EventEmitter();
    this.zoomOnRestaurant = new EventEmitter();
    this.restaurantRatingsAvg = new EventEmitter();
  }

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
