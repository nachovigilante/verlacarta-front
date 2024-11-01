import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByRestaurantComponent } from './orders-by-restaurant.component';

describe('OrdersByRestaurantComponent', () => {
  let component: OrdersByRestaurantComponent;
  let fixture: ComponentFixture<OrdersByRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersByRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersByRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
