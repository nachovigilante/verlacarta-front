import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '../order/orders.service';

@Component({
    selector: 'app-order-detail',
    standalone: true,
    imports: [],
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
    order: Order | null = null;
    constructor(
        private route: ActivatedRoute,
        private orderService: OrdersService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            const id = params.get('id');
            if (id) {
                this.order = await this.orderService.getOrderById(id);
            }
        });
    }
}
