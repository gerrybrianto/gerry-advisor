import { Component, Input, OnInit } from '@angular/core';
import { Rating } from '../restaurants.model';

@Component({
  selector: 'app-display-ratings',
  templateUrl: './display-ratings.component.html',
  styleUrls: ['./display-ratings.component.scss'],
})
export class DisplayRatingsComponent implements OnInit {
  @Input() ratings: Rating[];
  @Input() show: boolean;
  @Input() customRatings?: Rating[];
  constructor() {
    this.ratings = [];
    this.show = false;
  }

  ngOnInit(): void {}

  addCustomRating(newRating: Rating) {
    if (this.customRatings) this.customRatings.push(newRating);
  }
}
