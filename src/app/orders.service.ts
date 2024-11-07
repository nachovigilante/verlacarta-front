import { Injectable } from '@angular/core';
import { Restaurant } from './restaurants.service';
import { environment } from '../environments/environment';

export type Order = {
    id: string;
    number: number;
    type: 'PickUp' | 'DineIn';
    detail: string;
    status: string; // TODO: Use an enum
    tableId: string;
    createdAt: string;
    date: string;
    time: string;
    updatedAt: string;
    email: string;

    table: {
        id: string;
        restaurantId: string;
        number: number;
        restaurant: Restaurant;
    };
};

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    constructor() {}

    async getOrders() {
        return fetch(environment.backendUrl + '/orders')
            .then((response) => response.json())
            .then((data) =>
                data.map((order: Order) => ({
                    ...order,
                    date: new Date(order.createdAt).toLocaleDateString(),
                    // cut seconds
                    time:
                        new Date(order.createdAt)
                            .toLocaleTimeString()
                            .slice(0, -3) + 'hs',
                })),
            );
    }

    async getOrdersByRestaurantId(restaurantId: string) {
        return (
            fetch(environment.backendUrl + '/orders/restaurant/' + restaurantId)
                //return fetch(environment.backendUrl + '/orders')
                .then((response) => response.json())
                .then((data) =>
                    data.map((order: Order) => ({
                        ...order,
                        date: new Date(order.createdAt).toLocaleDateString(),
                        // cut seconds
                        time:
                            new Date(order.createdAt)
                                .toLocaleTimeString()
                                .slice(0, -3) + 'hs',
                    })),
                )
        );
    }

    async updateOrderStatus(orderId: string, newStatus: string) {
        const response = await fetch(
            `${environment.backendUrl}/orders/${orderId}/status`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newStatus }),
            },
        );
        if (!response.ok) {
            throw new Error('Failed to update order status');
        }
        return response.json();
    }
}