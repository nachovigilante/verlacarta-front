import { Component, Output } from '@angular/core';
import { OrdersService, Order } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService, Restaurant } from '../../restaurant/restaurants.service';
import { OrderCardComponent } from '../card/order-card.component';

@Component({
    selector: 'app-orders-by-restaurant',
    standalone: true,
    imports: [OrderCardComponent],
    templateUrl: './orders-by-restaurant.component.html',
    styleUrl: './orders-by-restaurant.component.scss',
})
export class OrdersByRestaurantComponent {
    orders: Order[] = [];
    id: string = '';
    orderStates = [
        'Aceptado',
        'En preparación',
        'Listo para ser retirado',
        'Próximo a ser llevado',
    ];
    restaurant: Restaurant | null = null;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrdersService,
        private restaurantsService: RestaurantsService,
    ) {}

    fetchOrders() {
        this.orderService
            .getOrdersByRestaurantId(this.id)
            .then((data) => (this.orders = data));
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            const id = params.get('restaurantId');
            if (id) {
                this.id = id;
                this.restaurant =
                    await this.restaurantsService.getRestaurantById(this.id);

                if (this.restaurant) this.fetchOrders();
            }
        });
    }

    @Output() async changeOrderStatus(order: Order) {
        try {
            const currentIndex = this.orderStates.indexOf(order.status);
            if (currentIndex < this.orderStates.length - 1) {
                const newStatus = this.orderStates[currentIndex + 1];
                this.orderService
                    .updateOrderStatus(order.id, newStatus)
                    .then((data) => {
                        console.log('Order status updated:', data);
                        order.status = newStatus; // Update the status in the UI
                    })
                    .catch((error) => {
                        console.error('Error updating order status:', error);
                    });
            }
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    }
}
