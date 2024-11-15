import { Component, Input, Output } from '@angular/core';
import { Order } from '../../orders.service';
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

    @Output() onStatusChange = new EventEmitter<Order>();

    changeStatus() {
        this.onStatusChange.emit(this.order);
    }
}
