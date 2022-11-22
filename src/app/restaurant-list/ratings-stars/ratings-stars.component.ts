import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings-stars',
  templateUrl: './ratings-stars.component.html',
  styleUrls: ['./ratings-stars.component.scss'],
})
export class RatingsStarsComponent implements OnInit {
  @Input() rating: number;
  starsArr: string[];

  constructor() {
    this.rating = 0;
    this.starsArr = ['empty', 'empty', 'empty', 'empty', 'empty'];
  }

  ngOnInit(): void {
    this.starsArr = this.starsArr.map((starValue, i) => {
      if (i < Math.floor(this.rating)) return 'star';
      return starValue;
    });
    if (this.endsWithHalfStar()) {
      this.starsArr[this.starsArr.lastIndexOf('star') + 1] = 'halfStar';
    }
  }

  endsWithHalfStar(): boolean {
    if (Number.isInteger(this.rating)) return false;
    const decimalStr = this.rating.toString().split('.')[1];
    const decimal = Number(decimalStr);
    if (decimal > 2) return true;
    return false;
  }
}
