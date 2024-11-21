import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Order,
    OrdersService,
    OrderStatus,
    orderStatusNames,
} from '../orders.service';

@Component({
    selector: 'app-order-detail',
    standalone: true,
    imports: [],
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
    order: Order | null = null;
    orderStatusNames = orderStatusNames;
    orderStatusDescriptions = {
        [OrderStatus.PENDING]:
            'Estamos esperando la confirmación del restaurante',
        [OrderStatus.ACCEPTED]:
            'El restaurante ha aceptado tu pedido y está preparando tu comida',
        [OrderStatus.REJECTED]:
            'Lo sentimos, el restaurante no ha podido aceptar tu pedido',
        [OrderStatus.READY]: 'Tu pedido está listo',
        [OrderStatus.DELIVERED]: 'Tu pedido ha sido entregado',
    };
    orderStatusClasses = {
        [OrderStatus.PENDING]: 'pending',
        [OrderStatus.ACCEPTED]: 'accepted',
        [OrderStatus.REJECTED]: 'rejected',
        [OrderStatus.READY]: 'ready',
        [OrderStatus.DELIVERED]: 'delivered',
    };

    pollInterval = 3000;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrdersService,
    ) {}

    async pollOrder() {
        if (!this.order) {
            setTimeout(() => this.pollOrder(), this.pollInterval);
            return;
        }

        const order = await this.orderService.getOrderById(this.order.id);
        if (order.status !== this.order.status) {
            this.order = order;
        }

        if (order.status !== OrderStatus.DELIVERED) {
            setTimeout(() => this.pollOrder(), this.pollInterval);
        }
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            const id = params.get('id');
            if (id) {
                this.order = await this.orderService.getOrderById(id);

                console.log(this.order);
            }
        });

        this.pollOrder();
    }
}
