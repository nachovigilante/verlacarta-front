import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, RestaurantsService } from '../restaurants.service';

@Component({
    selector: 'app-restaurant-details',
    standalone: true,
    imports: [],
    templateUrl: './restaurant-detail.component.html',
    styleUrl: './restaurant-detail.component.scss',
})
export class RestaurantDetailsComponent {
    restaurant: Restaurant | null = null;

    constructor(
        private route: ActivatedRoute,
        private restaurantsService: RestaurantsService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            const id = params.get('id');
            if (id) {
                const restaurant: Restaurant | null =
                    await this.restaurantsService.getRestaurantById(id);

                if (restaurant) this.restaurant = restaurant;
            }
        });
    }
}
