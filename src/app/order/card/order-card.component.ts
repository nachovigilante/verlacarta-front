import { Component, Input, Output } from '@angular/core';
import { Order, OrderStatus, orderStatusNames } from '../orders.service';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-order-card',
    standalone: true,
    imports: [],
    templateUrl: './order-card.component.html',
    styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
    @Input() order!: Order;
    @Input() admin = false;
    orderStatusNames = orderStatusNames;

    @Output() onStatusChange = new EventEmitter<{
        order: Order;
        newStatus: OrderStatus;
    }>();

    acceptOrder() {
        this.onStatusChange.emit({
            order: this.order,
            newStatus: OrderStatus.ACCEPTED,
        });
    }

    rejectOrder() {
        this.onStatusChange.emit({
            order: this.order,
            newStatus: OrderStatus.REJECTED,
        });
    }

    readyOrder() {
        this.onStatusChange.emit({
            order: this.order,
            newStatus: OrderStatus.READY,
        });
    }

    deliverOrder() {
        this.onStatusChange.emit({
            order: this.order,
            newStatus: OrderStatus.DELIVERED,
        });
    }
}
