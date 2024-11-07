import { Component, Input } from '@angular/core';
import { Order } from '../orders.service';

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
    @Input() changeStatus!: (order: Order) => void;
}
