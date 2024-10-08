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
    // url = "http://localhost:3000/restaurants"

    // Back hosteado
    url = 'https://verlacarta-back.vercel.app/restaurants';

    constructor() {}

    async getRestaurants() {
        return fetch(this.url)
            .then((response) => response.json())
            .then((data) => data);
    }
}
