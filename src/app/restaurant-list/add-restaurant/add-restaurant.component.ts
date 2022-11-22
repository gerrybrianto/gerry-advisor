import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Restaurant } from '../restaurants.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: [
    './add-restaurant.component.scss',
    '../restaurant-list.component.scss',
  ],
})
export class AddRestaurantComponent implements OnInit {
  @Output() addRestaurant: EventEmitter<Restaurant>;
  addRestaurantForm: FormGroup;
  showForm: boolean;

  constructor() {
    this.addRestaurantForm = new FormGroup({
      restaurantName: new FormControl(''),
      address: new FormControl(''),
    });
    this.addRestaurant = new EventEmitter();
    this.showForm = false;
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('in');
    if (this.addRestaurantForm.valid && this.addRestaurantForm.dirty) {
      const newRestaurant: Restaurant = {
        id: uuid.v4(),
        restaurantName: this.addRestaurantForm.value.restaurantName,
        address: this.addRestaurantForm.value.address,
        lat: 0,
        long: 0,
        avgRating: 0,
      };
      this.addRestaurant.emit(newRestaurant);
      console.log('addRatingForm: ,', this.addRestaurantForm.value);
      this.addRestaurantForm.reset({ restaurantName: '', address: '' });
      this.showForm = false;
    }
  }
}
