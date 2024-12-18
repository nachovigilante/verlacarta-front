import { Component } from '@angular/core';
import { Order, OrdersService } from '../orders.service';
import { OrderCardComponent } from '../card/order-card.component';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [OrderCardComponent],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
})
export class OrdersComponent {
    constructor(private orderService: OrdersService) {}

    orders: Order[] = [];
    filteredOrders: Order[] = [];
    searchOrders = (e: SubmitEvent) => {
        e.preventDefault();

        const form = e.target! as HTMLFormElement;
        const searchValue = (form.elements[0] as HTMLInputElement).value;

        if (!searchValue) {
            this.filteredOrders = this.orders;
            return;
        }

        this.filteredOrders = this.orders.filter(
            (order) => order.email.startsWith(searchValue),
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
