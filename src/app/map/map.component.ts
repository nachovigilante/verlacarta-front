import { Component, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LocationService } from '../location.service';
import { environment } from '../../environments/environment';
// import 'mapbox-gl/dist/mapbox-gl.css';
import { Restaurant } from '../restaurants.service';

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

    @Input()
    restaurants: Restaurant[] = [];

    constructor(private locationService: LocationService) {}

    async ngOnInit() {
        const position = await this.locationService.getCurrentLocation();

        this.lat = position.lat;
        this.lng = position.lng;

        const geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [this.lng, this.lat],
                    },
                    properties: {
                        title: 'Vos ',
                        description: 'Acá va la dirección de tu ubicación',
                    },
                },
            ],
        };

        this.map = new mapboxgl.Map({
            accessToken: environment.apiKey,
            container: 'map',
            style: this.style,
            zoom: 14,
            center: [this.lng, this.lat],
        });

        for (const point of geojson.features) {
            new mapboxgl.Marker()
                .setLngLat(point.geometry.coordinates as mapboxgl.LngLatLike)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<h3>${point.properties.title}</h3><p>${point.properties.description}</p>`,
                        ),
                )
                .addTo(this.map);
        }

        for (const restaurant of this.restaurants) {
            const location = restaurant.location.split(',');
            
            const geojson = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [parseFloat(location[1]), parseFloat(location[0])],
                        },
                        properties: {
                            title: restaurant.name,
                            description: restaurant.location, // TODO: Add more details
                        },
                    },
                ],
            };

            for (const point of geojson.features) {
                new mapboxgl.Marker()
                    .setLngLat(point.geometry.coordinates as mapboxgl.LngLatLike)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<h3>${point.properties.title}</h3><p>${point.properties.description}</p>`,
                            ),
                    )
                    .addTo(this.map);
            }
        }
    }
}
