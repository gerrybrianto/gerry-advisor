import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRatingsComponent } from './display-ratings.component';

describe('DisplayRatingsComponent', () => {
  let component: DisplayRatingsComponent;
  let fixture: ComponentFixture<DisplayRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayRatingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
