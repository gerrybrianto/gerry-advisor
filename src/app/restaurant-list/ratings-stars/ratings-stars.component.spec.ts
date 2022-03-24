import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsStarsComponent } from './ratings-stars.component';

describe('RatingsStarsComponent', () => {
  let component: RatingsStarsComponent;
  let fixture: ComponentFixture<RatingsStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingsStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
