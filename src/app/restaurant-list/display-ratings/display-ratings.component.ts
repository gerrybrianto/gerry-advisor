import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Rating } from '../restaurants.model';

@Component({
  selector: 'app-display-ratings',
  templateUrl: './display-ratings.component.html',
  styleUrls: ['./display-ratings.component.scss'],
})
export class DisplayRatingsComponent implements OnInit {
  @Input() ratings: Rating[];
  @Input() customRatings?: Rating[];
  @Output() addCustomRating: EventEmitter<Rating>;
  constructor() {
    this.ratings = [];
    this.addCustomRating = new EventEmitter();
  }

  ngOnInit(): void {}

  emitNewCustomRating(newRating: Rating) {
    this.addCustomRating.emit(newRating);
  }
}
