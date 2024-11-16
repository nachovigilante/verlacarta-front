import { Routes } from '@angular/router';
import { RestaurantsListComponent } from './restaurant/list/restaurants-list.component';
import { OrderComponent } from './order/orders/orders.component';
import { OrdersByRestaurantComponent } from './order/orders-by-restaurant/orders-by-restaurant.component';
import { MapComponent } from './map/map.component';
import { CreateRestaurantComponent } from './restaurant/create/create-restaurant.component';
import { MenuComponent } from './restaurant/menu/menu.component';
import { RestaurantDetailsComponent } from './restaurant/restaurant-detail/restaurant-detail.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';

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
        path: 'restaurant/register',
        component: CreateRestaurantComponent,
    },
    {
        path: 'restaurant/:id',
        component: RestaurantDetailsComponent,
    },
    { path: 'restaurant/:id/menu/:tableNumber', component: MenuComponent },
    { path: 'restaurant/:id/menu', component: MenuComponent },
    { path: 'order', component: OrderComponent },
    {
        path: 'admin/login',
        component: AdminLoginComponent,
    },
    { path: 'admin/orders', component: OrdersByRestaurantComponent },
];
