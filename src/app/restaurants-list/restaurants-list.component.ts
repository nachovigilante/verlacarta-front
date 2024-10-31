import { Component } from '@angular/core';
import { Restaurant, RestaurantsService } from '../restaurants.service';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { MapComponent } from '../map/map.component';

@Component({
    selector: 'app-restaurants-list',
    standalone: true,
    imports: [RestaurantCardComponent, MapComponent],
    templateUrl: './restaurants-list.component.html',
    styleUrl: './restaurants-list.component.scss',
})
export class RestaurantsListComponent {
    constructor(private restaurantsService: RestaurantsService) {}

    restaurants: Restaurant[] = [];

    mode: 'list' | 'map' = 'list';

    toggleMode() {
        this.mode = this.mode === 'list' ? 'map' : 'list';
    }

    fetchRestaurants() {
        this.restaurantsService
            .getRestaurants()
            .then((data) => (this.restaurants = data));
    }

    ngOnInit() {
        this.fetchRestaurants();
    }
}
