import { Component, Input } from '@angular/core';
import { LocationService } from '../../location.service';
import { Restaurant } from '../restaurants.service';

@Component({
    selector: 'app-restaurant-card',
    standalone: true,
    imports: [],
    templateUrl: './restaurant-card.component.html',
    styleUrl: './restaurant-card.component.scss',
})
export class RestaurantCardComponent {
    @Input() restaurant!: Restaurant;

    constructor(private locationService: LocationService) {}

    distanceToUser = '';

    async ngOnInit() {
        const restaurantPosition = {
            lat: this.restaurant.lat,
            lng: this.restaurant.lng,
        };

        const distance = this.locationService.distanceBetween(
            restaurantPosition,
            await this.locationService.getCurrentLocation(),
        );

        const distanceInMeters = Math.round(distance);
        const distanceInKilometers = (distanceInMeters / 1000).toFixed(1);

        if (distanceInKilometers.split('.')[1] === '0') {
            this.distanceToUser = `${distanceInKilometers.split('.')[0]} km`;
        } else {
            this.distanceToUser = `${distanceInKilometers} km`;
        }
    }
}