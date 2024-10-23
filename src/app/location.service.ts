import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

export type Position = {
    lat: number;
    lng: number;
};

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    constructor() {}

    getCurrentLocation(): Promise<Position> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (position) {
                            const location = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            resolve(location);
                        } else {
                            reject('Unable to retrieve your location');
                        }
                    },
                    (error) => {
                        reject('Unable to retrieve your location');
                    },
                );
            } else {
                reject('Geolocation is not supported by this browser');
            }
        });
    }

    async reverseGeocode(position: Position) {
        const apiKey = environment.apiKey;
        const result = await fetch(
            `https://api.mapbox.com/search/geocode/v6/reverse?language=es&longitude=${position.lng}&latitude=${position.lat}&access_token=${apiKey}`,
        );

        const json = await result.json();

        const address = json.features[0].properties.context.address.name;

        const city = json.features[0].properties.context.region.name;

        return `${address}, ${city}`;
    }
}
