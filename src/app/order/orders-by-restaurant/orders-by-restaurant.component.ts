import { Component, Output } from '@angular/core';
import { OrdersService, Order } from '../orders.service';
import { Restaurant } from '../../restaurant/restaurants.service';
import { OrderCardComponent } from '../card/order-card.component';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-orders-by-restaurant',
    standalone: true,
    imports: [OrderCardComponent, RouterOutlet],
    templateUrl: './orders-by-restaurant.component.html',
    styleUrl: './orders-by-restaurant.component.scss',
})
export class OrdersByRestaurantComponent {
    orders: Order[] = [];
    id: string = '';
    restaurant: Restaurant | null = null;

    constructor(
        private authService: AuthService,
        private orderService: OrdersService,
        private router: Router,
    ) {}

    fetchOrders(restaurantId: string) {
        this.orderService
            .getOrdersByRestaurantId(restaurantId)
            .then((data) => (this.orders = data));
    }

    ngOnInit(): void {
        if (this.authService.checkAdmin())
            this.fetchOrders(this.authService.loggedInRestaurant!.id);
        else this.router.navigate(['/admin/login']);
    }

    @Output() async changeOrderStatus(order: Order) {
        try {
            const newStatus = order.status < 4 ? order.status + 1 : 4;
            this.orderService
                .updateOrderStatus(order.id, newStatus)
                .then((data) => {
                    console.log('Order status updated:', data);
                    order.status = newStatus;
                })
                .catch((error) => {
                    console.error('Error updating order status:', error);
                });
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    }
}
