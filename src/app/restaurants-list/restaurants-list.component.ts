import { Component } from '@angular/core';
import { Restaurant, RestaurantsService } from '../restaurants.service';

@Component({
    selector: 'app-restaurants-list',
    standalone: true,
    imports: [],
    templateUrl: './restaurants-list.component.html',
    styleUrl: './restaurants-list.component.scss',
})
export class RestaurantsListComponent {
    constructor(private restaurantsService: RestaurantsService) {}

    restaurants: Restaurant[] = [];

    fetchRestaurants() {
        this.restaurantsService
            .getRestaurants()
            .then((data) => (this.restaurants = data));
    }

    ngOnInit() {
        this.fetchRestaurants();
    }
}
