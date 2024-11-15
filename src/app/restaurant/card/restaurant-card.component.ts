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

    constructor() {}
}
