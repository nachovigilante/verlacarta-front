import { Routes } from '@angular/router';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { OrdersByRestaurantComponent } from './orders-by-restaurant/orders-by-restaurant.component';
import { MapComponent } from './map/map.component';

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
