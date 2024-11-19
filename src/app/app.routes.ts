import { Routes } from '@angular/router';
import { RestaurantsListComponent } from './restaurant/list/restaurants-list.component';
import { OrdersComponent } from './order/orders/orders.component';
import { OrdersByRestaurantComponent } from './order/orders-by-restaurant/orders-by-restaurant.component';
import { MapComponent } from './map/map.component';
import { CreateRestaurantComponent } from './restaurant/create/create-restaurant.component';
import { MenuComponent } from './restaurant/menu/menu.component';
import { RestaurantDetailsComponent } from './restaurant/restaurant-detail/restaurant-detail.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { PlaceOrderComponent } from './order/place-order/place-order.component';

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
    { path: 'restaurant/:id/menu', component: MenuComponent },
    { path: 'restaurant/:id/menu/:tableId', component: MenuComponent },
    { path: 'restaurant/:id/order/pickup', component: PlaceOrderComponent },
    { path: 'restaurant/:id/order/:tableId', component: PlaceOrderComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'admin/auth', component: OrdersByRestaurantComponent },
    { path: 'admin/register', component: OrdersByRestaurantComponent },
    {
        path: 'admin/login',
        component: AdminLoginComponent,
    },
    { path: 'admin', component: AdminComponent },
    { path: 'admin/orders', component: OrdersByRestaurantComponent },
];
