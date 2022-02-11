import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { Rating, Restaurant } from './restaurants.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  @Input() restaurantsWithRatings: ReadonlyArray<{
    restaurant: Restaurant;
    ratings: Rating[];
  }> | null;
  @Output() add: EventEmitter<string>;
  @Output() zoomOnRestaurant: EventEmitter<Restaurant>;

  constructor() {
    this.restaurantsWithRatings = [];
    this.add = new EventEmitter();
    this.zoomOnRestaurant = new EventEmitter();
  }

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
