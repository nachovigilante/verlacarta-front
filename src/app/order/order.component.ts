import { Component } from '@angular/core';
import { Order, OrdersService } from '../orders.service';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [],
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
})
export class OrderComponent {
    constructor(private orderService: OrdersService) {}

    orders: Order[] = [];

    fetchOrders() {
        this.orderService.getOrders().then((data) => (this.orders = data));
    }

    ngOnInit() {
        this.fetchOrders();
    }
}
