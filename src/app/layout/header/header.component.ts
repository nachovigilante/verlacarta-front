import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LocationService, Position } from '../../location.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
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
