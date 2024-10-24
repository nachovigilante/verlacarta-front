import { Injectable } from '@angular/core';

export interface Restaurant {
    id: string;
    name: string;
    location: string;
    description: string;
    logo: string;
    menu: string;
}

@Injectable({
    providedIn: 'root',
})
export class RestaurantsService {
    // Back local
    url = "http://localhost:3000/restaurants"

    // Back hosteado
    //url = 'https://verlacarta-back.vercel.app/restaurants';

    constructor() { }

    async getRestaurants() {
        return fetch(this.url)
            .then((response) => response.json())
            .then((data) => data);
    }

    async createRestaurant(name: string, location: string, tables: number, logo: string, menu: string): Promise<Restaurant | null> {
        const restaurantData = {
            name,
            location,
            menu,
            tables,
            logo,
        };

        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurantData),
            });

            if (response.ok) {
                return response.json();
            } else {
                console.error('Failed to create restaurant:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error creating restaurant:', error);
            return null;
        }
    }

}
