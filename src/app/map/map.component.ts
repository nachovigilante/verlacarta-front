import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LocationService } from '../location.service';
import { environment } from '../../environments/environment';
// import 'mapbox-gl/dist/mapbox-gl.css';
import {
    Restaurant,
    RestaurantsService,
} from '../restaurant/restaurants.service';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
})
export class MapComponent {
    map: mapboxgl.Map | undefined;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat: number = 0;
    lng: number = 0;

    constructor(
        private locationService: LocationService,
        private restaurantsService: RestaurantsService,
    ) {}
    restaurants: Restaurant[] = [];

    async fetchRestaurants() {
        const data = await this.restaurantsService.getRestaurants();
        this.restaurants = data;
    }

    async ngOnInit() {
        await this.fetchRestaurants();

        const position = await this.locationService.getCurrentLocation();

        this.lat = position.lat;
        this.lng = position.lng;

        this.map = new mapboxgl.Map({
            accessToken: environment.apiKey,
            container: 'map',
            style: this.style,
            zoom: 14,
            center: [this.lng, this.lat],
        });

        const location = await this.locationService.reverseGeocode({
            lat: this.lat,
            lng: this.lng,
        });

        new mapboxgl.Marker()
            .setLngLat([this.lng, this.lat] as mapboxgl.LngLatLike)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(`<h3>Acá estas vos</h3><p>${location}</p>`),
            )
            .addTo(this.map);

        for (const restaurant of this.restaurants) {
            const geojson = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [restaurant.lng, restaurant.lat],
                        },
                        properties: {
                            title: restaurant.name,
                            location: restaurant.location,
                            image: restaurant.logo,
                        },
                    },
                ],
            };

            const markerEl = document.createElement('div');
            markerEl.className = 'restaurant-marker';
            markerEl.style.backgroundImage = `url(${restaurant.logo})`;

            for (const point of geojson.features) {
                new mapboxgl.Marker(markerEl)
                    .setLngLat(
                        point.geometry.coordinates as mapboxgl.LngLatLike,
                    )
                    .setPopup(
                        new mapboxgl.Popup().setHTML(
                            `<h3>${point.properties.title}</h3><p>${point.properties.location}</p>`,
                        ),
                    )
                    .addTo(this.map);
            }
        }
    }
}
