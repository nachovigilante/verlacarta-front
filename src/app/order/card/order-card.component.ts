import { Component, Input, Output } from '@angular/core';
import { Order, orderStatusNames } from '../orders.service';
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
    
    @Output() onStatusChange = new EventEmitter<Order>();

    changeStatus() {
        this.onStatusChange.emit(this.order);
    }
}
