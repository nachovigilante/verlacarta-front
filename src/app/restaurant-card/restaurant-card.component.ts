import { Component, Input } from '@angular/core';
import { Restaurant } from '../restaurants.service';
import { LocationService } from '../location.service';

@Component({
    selector: 'app-restaurant-card',
    standalone: true,
    imports: [],
    templateUrl: './restaurant-card.component.html',
    styleUrl: './restaurant-card.component.scss',
})
export class RestaurantCardComponent {
    @Input()
    restaurant!: Restaurant;

    constructor(private locationService: LocationService) {}

    distanceToUser = '';

    async ngOnInit() {
        const restaurantPosition = {
            lat: parseFloat(this.restaurant.location.split(',')[0]),
            lng: parseFloat(this.restaurant.location.split(',')[1]),
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
            this.distanceToUser = `${distanceInKilometers.replace('.', ',')} km`;
        }
    }
}
