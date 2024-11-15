import { Routes } from '@angular/router';
import { RestaurantsListComponent } from './restaurant/restaurants-list/restaurants-list.component';
import { OrderComponent } from './order/order/order.component';
import { OrdersByRestaurantComponent } from './order/orders-by-restaurant/orders-by-restaurant.component';
import { MapComponent } from './map/map.component';
import { CreateRestaurantComponent } from './restaurant/create-restaurant/create-restaurant.component';
import { MenuComponent } from './restaurant/menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        component: RestaurantsListComponent,
    },
    {
        path: 'map',
        component: MapComponent,
    },
    {
        path: 'createRestaurant',
        component: CreateRestaurantComponent,
    },
    { path: 'menu/:id/:tableNumber', component: MenuComponent },
    { path: 'menu/:id', component: MenuComponent },
    { path: 'order', component: OrderComponent },
    { path: 'orders/:restaurantId', component: OrdersByRestaurantComponent },
];
