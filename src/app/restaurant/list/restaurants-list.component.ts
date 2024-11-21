import { Component } from '@angular/core';
import { Restaurant, RestaurantsService } from '../restaurants.service';
import { RestaurantCardComponent } from '../card/restaurant-card.component';

@Component({
    selector: 'app-restaurants-list',
    standalone: true,
    imports: [RestaurantCardComponent],
    templateUrl: './restaurants-list.component.html',
    styleUrl: './restaurants-list.component.scss',
})
export class RestaurantsListComponent {
    constructor(private restaurantsService: RestaurantsService) {}

    restaurants: Restaurant[] = [];

    fetchRestaurants() {
        this.restaurantsService
            .getRestaurants()
            .then((data) =>
                data.sort(
                    (a, b) =>
                        a.distanceToUserInMeters - b.distanceToUserInMeters,
                ),
            )
            .then((data) => (this.restaurants = data));
    }

    ngOnInit() {
        this.fetchRestaurants();
    }
}
