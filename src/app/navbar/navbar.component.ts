import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [MatIconModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    active = '';

    constructor(private router: Router) {
        router.events.subscribe((val) => {
            this.active = this.router.url.split('/')[1];
        });
    }
}
