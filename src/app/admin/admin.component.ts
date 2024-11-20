import { Component, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant/restaurants.service';
import { Order, OrdersService } from '../order/orders.service';
import { Table } from '../tables.service';
import { OrderCardComponent } from '../order/card/order-card.component';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [OrderCardComponent],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent {
    restaurant: Restaurant | null = null;
    tables: Table[] = [];
    orders: Order[] = [];
    ordersByTable: { [key: string]: Order[] } = {};

    constructor(
        private authService: AuthService,
        private router: Router,
        private orderService: OrdersService,
    ) {
        if (!this.authService.checkAdmin()) {
            this.router.navigate(['/admin/login']);
        } else {
            this.restaurant = this.authService.loggedInRestaurant;
            this.tables = this.restaurant!.Table.map((table) => table);

            this.tables.forEach((table) => {
                this.ordersByTable[table.id] = [];
            });

            this.fetchOrders(this.restaurant!.id);
        }
    }

    fetchOrders(restaurantId: string) {
        this.orderService.getOrdersByRestaurantId(restaurantId).then((data) => {
            this.orders = data;

            this.tables.forEach((table) => {
                this.ordersByTable[table.id] =
                    this.orders.filter((order) => order.tableId === table.id) ||
                    [];
            });
        });
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
