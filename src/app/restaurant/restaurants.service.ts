import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export type Restaurant = {
    id: string;
    name: string;
    password: string;
    location: string;
    lat: number;
    lng: number;
    description: string;
    logo: string;
    menu: string;
};

@Injectable({
    providedIn: 'root',
})
export class RestaurantsService {
    constructor() {}

    async getRestaurants() {
        return fetch(environment.backendUrl + '/restaurants')
            .then((response) =>  response.json())
            .then((data) => data);
    }

    async createRestaurant(
        name: string,
        password: string,
        location: string,
        tables: number,
        logo: string,
        menu: string,
        lat:number,
        lng: number,
    ): Promise<Restaurant | null> {

        const restaurantData = {
            name,
            password,
            location,
            menu,
            tables,
            logo,
            lat,
            lng
        };
        
        try {
            const response = await fetch(`${environment.backendUrl}/restaurants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurantData),
            });

            if (response.ok) {
                return response.json();
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

    async getRestaurantById(id: string): Promise<Restaurant | null> {
        try {
            const response = await fetch(
                `${environment.backendUrl}/restaurants/${id}`,
            );

            if (response.ok) {
                return response.json();
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
}
