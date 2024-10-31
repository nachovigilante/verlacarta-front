import { Routes } from '@angular/router';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        component: RestaurantsListComponent,
    },
    {
        path: 'createRestaurant',
        component: CreateRestaurantComponent,
        canActivate: [],
        data: {},
    },

    { path: 'menu/:id/:tableNumber', component: MenuComponent },
    { path: 'menu/:id', component: MenuComponent },
];
