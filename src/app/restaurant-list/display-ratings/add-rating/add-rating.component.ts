import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Rating } from '../../restaurants.model';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: [
    './add-rating.component.scss',
    '../../restaurant-list.component.scss',
  ],
})
export class AddRatingComponent implements OnInit {
  //rajouter restaurant Id en input
  @Output() addRating: EventEmitter<Rating>;
  addRatingForm: FormGroup;

  constructor() {
    this.addRatingForm = new FormGroup({
      stars: new FormControl(0, [Validators.min(0), Validators.max(5)]),
      comment: new FormControl(''),
    });
    this.addRating = new EventEmitter();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addRatingForm.valid) {
      console.log('addRatingForm: ,', this.addRatingForm.value);
      const formRating: Rating = {
        stars: this.addRatingForm.value.stars,
        comment: this.addRatingForm.value.stars.comment,
      };
      this.addRating.emit(formRating);
    }
  }
}
