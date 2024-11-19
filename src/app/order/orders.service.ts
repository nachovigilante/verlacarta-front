import { Injectable } from '@angular/core';
import { Restaurant } from '../restaurant/restaurants.service';
import { environment } from '../../environments/environment';

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
                body: JSON.stringify({ status: newStatus }),
            },
        );
        if (!response.ok) {
            throw new Error('Failed to update order status');
        }
        return response.json();
    }

    async placeOrder(
        email: string,
        detail: string,
        type: 'PickUp' | 'DineIn',
        restaurantId: string,
        tableId: string | null,
    ) {
        const orderData = {
            email,
            detail,
            type,
            restaurantId,
            tableId,
            // TODO: Do not hardcode the number
            number: 1
        };

        try {
            const response = await fetch(environment.backendUrl + '/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                return (await response.json()) as Order;
            } else {
                console.error('Failed to place order:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error placing order:', error);
            return null;
        }
    }
}
