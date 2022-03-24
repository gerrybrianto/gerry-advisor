import { Component, Input, OnInit } from '@angular/core';
import { GooglePlacesService } from '../restaurants.service';

@Component({
  selector: 'app-restaurant-image',
  templateUrl: './restaurant-image.component.html',
  styleUrls: ['./restaurant-image.component.scss'],
})
export class RestaurantImageComponent implements OnInit {
  @Input() restaurantPos: { lat: number; lng: number };
  restaurantImg: any;

  constructor(private restaurantsService: GooglePlacesService) {
    this.restaurantPos = { lat: 0, lng: 0 };
  }

  ngOnInit(): void {
    this.restaurantsService
      .getStreetViewImage(this.restaurantPos)
      .subscribe((result) => {
        this.createImageFromBlob(result);
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.restaurantImg = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
