import { Injectable } from '@angular/core';
import { Restaurant } from '../restaurant/restaurants.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loggedIn = false;
    loggedInRestaurant: Restaurant | null = null;

    constructor() {}

    async login(name: string, password: string) {
        const response = await fetch(
            environment.backendUrl + '/restaurants/signin',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            },
        );

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        } else {
            this.loggedIn = true;
            this.loggedInRestaurant = data.restaurant;
        }
    }
}
