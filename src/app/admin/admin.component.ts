import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant/restaurants.service';
import { Order, OrdersService } from '../order/orders.service';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent {
    restaurant: Restaurant | null = null;
    tables: number[] = [];
    orders: Order[] = [];
    
    constructor(
        private authService: AuthService,
        private router: Router,
        private orderService: OrdersService,
    ) {
        // TODO: Fetch tables count from backend
        this.tables = [1, 2, 3, 4];
        if (!this.authService.checkAdmin()) {
            // TODO: reactivate this line
            this.router.navigate(['/admin/login']);
        } else {
            this.restaurant = this.authService.loggedInRestaurant;
            // console.log('Restaurant:', this.restaurant);
            // TODO: Fetch tables count from backend
            this.tables = [1, 2, 3, 4];

            this.fetchOrders(this.restaurant!.id);
        }
    }

    fetchOrders(restaurantId: string) {
        this.orderService
            .getOrdersByRestaurantId(restaurantId)
            .then((data) => (this.orders = data));
    }
}
