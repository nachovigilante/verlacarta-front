import { Component } from '@angular/core';
import { Position, LocationService } from '../location.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    constructor(private locationService: LocationService) {}

    position: Position | null = null;

    address = '';

    async ngOnInit() {
        this.position = await this.locationService.getCurrentLocation();
        this.address = await this.locationService.reverseGeocode(this.position);
    }
}
