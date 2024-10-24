import { Routes } from '@angular/router';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';

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
];
