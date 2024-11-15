import { Component } from '@angular/core';
import { Order, OrdersService } from '../../orders.service';
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
    filteredOrders: Order[] = [];
    searchOrders = (e: SubmitEvent) => {
        e.preventDefault();

        const form = e.target! as HTMLFormElement;
        const searchValue = parseInt(
            (form.elements[0] as HTMLInputElement).value,
        );

        if (!searchValue) {
            this.filteredOrders = this.orders;
            return;
        }

        this.filteredOrders = this.orders.filter(
            (order) => order.number === searchValue,
        );

        console.log(this.filteredOrders);
    };

    fetchOrders() {
        this.orderService.getOrders().then((data) => {
            this.orders = data;
            this.filteredOrders = data;
        });
    }

    ngOnInit() {
        this.fetchOrders();
    }
}
