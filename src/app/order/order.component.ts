import { Component } from '@angular/core';
import { Order, OrdersService } from '../orders.service';
import { OrderCardComponent } from '../order-card/order-card.component';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [OrderCardComponent],
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
