import { Component, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant/restaurants.service';
import { Order, OrdersService, OrderStatus } from '../order/orders.service';
import { Table } from '../tables.service';
import { OrderCardComponent } from '../order/card/order-card.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [OrderCardComponent, QRCodeModule, MatIconModule],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent {
    restaurant: Restaurant | null = null;
    tables: Table[] = [];
    orders: Order[] = [];
    ordersByTable: { [key: string]: Order[] } = {};
    pickupOrders: Order[] = [];

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

            this.pickupOrders = [];

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

            this.pickupOrders = this.orders.filter(
                (order) => order.tableId === null,
            );
        });
    }

    async updateOrderStatus(order: Order, newStatus: number) {
        try {
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

    @Output() acceptOrder(order: Order) {
        if (order.status !== OrderStatus.PENDING)
            throw new Error('Order is not pending');

        this.updateOrderStatus(order, OrderStatus.ACCEPTED);
    }

    @Output() rejectOrder(order: Order) {
        if (order.status !== OrderStatus.PENDING)
            throw new Error('Order is not pending');

        this.updateOrderStatus(order, OrderStatus.REJECTED);
    }

    @Output() readyOrder(order: Order) {
        if (order.status !== OrderStatus.ACCEPTED)
            throw new Error('Order is not accepted');

        this.updateOrderStatus(order, OrderStatus.READY);
    }

    @Output() deliverOrder(order: Order) {
        if (order.status !== OrderStatus.READY)
            throw new Error('Order is not ready');

        this.updateOrderStatus(order, OrderStatus.DELIVERED);
    }

    @Output() async changeOrderStatus({
        order,
        newStatus,
    }: {
        order: Order;
        newStatus: OrderStatus;
    }) {
        if (newStatus === OrderStatus.ACCEPTED) {
            this.acceptOrder(order);
        } else if (newStatus === OrderStatus.REJECTED) {
            this.rejectOrder(order);
        } else if (newStatus === OrderStatus.READY) {
            this.readyOrder(order);
        } else if (newStatus === OrderStatus.DELIVERED) {
            this.deliverOrder(order);
        }
    }

    showQRCode(id: string) {
        const qrCode = document.getElementById('qr-' + id);

        if (qrCode) {
            qrCode.classList.toggle('active');
        }
    }

    copyToClipboard(id: string) {
        const content =
            'https://verlacarta-front.vercel.app/restaurant/' +
            this.restaurant!.id +
            '/order/' +
            id;

        navigator.clipboard.writeText(content).then(() => {
            console.log('Copied to clipboard:', content);
        });
    }
}
