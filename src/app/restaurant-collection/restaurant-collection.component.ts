import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-restaurant-collection',
  templateUrl: './restaurant-collection.component.html',
  styleUrls: ['./restaurant-collection.component.scss'],
})
export class RestaurantCollectionComponent {
  @Input() restaurants: any;
  @Output() remove: EventEmitter<string>;

  constructor() {
    this.restaurants = [];
    this.remove = new EventEmitter();
  }
  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
