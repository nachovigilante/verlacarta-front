import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LocationService } from '../location.service';
import { Table } from '../tables.service';

export type Restaurant = {
    id: string;
    name: string;
    password: string;
    location: string;
    lat: number;
    lng: number;
    description: string;
    logo: string;
    banner: string;
    menu: string;
    distanceToUser: string;
    distanceToUserInMeters: number;
    Table: Table[];
};

@Injectable({
    providedIn: 'root',
})
export class RestaurantsService {
    constructor(private locationService: LocationService) {}

    async getRestaurants() {
        return fetch(environment.backendUrl + '/restaurants')
            .then((response) => response.json())
            .then((restaurants) =>
                Promise.all(
                    restaurants.map(async (restaurant: Restaurant) => {
                        restaurant.distanceToUserInMeters =
                            await this.calculateDistanceToUser(
                                restaurant,
                                this.locationService,
                            );

                        restaurant.distanceToUser = this.formatDistance(
                            restaurant.distanceToUserInMeters,
                        );

                        return restaurant;
                    }),
                ),
            );
    }

    async getRestaurantById(id: string): Promise<Restaurant | null> {
        try {
            const response = await fetch(
                `${environment.backendUrl}/restaurants/${id}`,
            );

            if (response.ok) {
                const restaurant = (await response.json()) as Restaurant;

                restaurant.distanceToUserInMeters =
                    await this.calculateDistanceToUser(
                        restaurant,
                        this.locationService,
                    );

                restaurant.distanceToUser = this.formatDistance(
                    restaurant.distanceToUserInMeters,
                );

                return restaurant;
            } else {
                console.error(
                    `Failed to fetch restaurant with id ${id}:`,
                    response.statusText,
                );
                return null;
            }
        } catch (error) {
            console.error(`Error fetching restaurant with id ${id}:`, error);
            return null;
        }
    }

    async createRestaurant(
        name: string,
        password: string,
        location: string,
        tables: number,
        logo: string,
        banner: string,
        menu: string,
        lat: number,
        lng: number,
    ) {
        const restaurantData = {
            name,
            password,
            location,
            menu,
            tables,
            logo,
            banner,
            lat,
            lng,
        };

        try {
            const response = await fetch(
                `${environment.backendUrl}/restaurants`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(restaurantData),
                },
            );

            if (response.ok) {
                return (await response.json()) as Restaurant;
            } else {
                console.error(
                    'Failed to create restaurant:',
                    response.statusText,
                );
                return null;
            }
        } catch (error) {
            console.error('Error creating restaurant:', error);
            return null;
        }
    }

    async calculateDistanceToUser(
        restaurant: Restaurant,
        locationService: LocationService,
    ) {
        const restaurantPosition = {
            lat: restaurant.lat,
            lng: restaurant.lng,
        };

        const distance = locationService.distanceBetween(
            restaurantPosition,
            await locationService.getCurrentLocation(),
        );

        return Math.round(distance);
    }

    formatDistance(distanceInMeters: number) {
        const distanceInKilometers = distanceInMeters / 1000;

        if (distanceInKilometers >= 100) return '+99 km';

        if (distanceInKilometers.toFixed(1).split('.')[1] === '0')
            return `${distanceInKilometers.toFixed(1).split('.')[0]} km`;

        return `${distanceInKilometers.toFixed(1)} km`;
    }
}
