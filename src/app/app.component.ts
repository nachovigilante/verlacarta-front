import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { HeaderComponent } from './header/header.component';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'VerLaCarta';
}
