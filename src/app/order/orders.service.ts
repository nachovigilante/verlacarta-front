import { Injectable } from '@angular/core';
import { Restaurant } from '../restaurant/restaurants.service';
import { environment } from '../../environments/environment';
import { Table } from '../tables.service';

export enum OrderStatus {
    PENDING = 0,
    ACCEPTED = 1,
    REJECTED = -1,
    READY = 2,
    DELIVERED = 3,
}

export const orderStatusNames = {
    [OrderStatus.PENDING]: 'Pendiente',
    [OrderStatus.ACCEPTED]: 'Aceptado',
    [OrderStatus.REJECTED]: 'Rechazado',
    [OrderStatus.READY]: 'Listo',
    [OrderStatus.DELIVERED]: 'Entregado',
};

export type Order = {
    id: string;
    number: number;
    type: 'PickUp' | 'DineIn';
    detail: string;
    status: OrderStatus;
    tableId: string;
    createdAt: string;
    date: string;
    time: string;
    updatedAt: string;
    email: string;
    table: Table;
    restaurant: Restaurant;
};

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    constructor() {}

    async getOrders() {
        return fetch(environment.backendUrl + '/orders')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                return data.map((order: Order) => ({
                    ...order,
                    date: new Date(order.createdAt).toLocaleDateString(),
                    time:
                        new Date(order.createdAt)
                            .toLocaleTimeString()
                            .slice(0, -6) + 'hs',
                }));
            });
    }

    async getOrdersByRestaurantId(restaurantId: string) {
        return fetch(
            environment.backendUrl + '/orders/restaurant/' + restaurantId,
        )
            .then((response) => response.json())
            .then((data) =>
                data.map((order: Order) => ({
                    ...order,
                    date: new Date(order.createdAt).toLocaleDateString(),
                    time:
                        new Date(order.createdAt)
                            .toLocaleTimeString()
                            .slice(0, -6) + 'hs',
                })),
            );
    }

    async updateOrderStatus(orderId: string, newStatus: number) {
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
            tableId: type === 'DineIn' ? tableId : null,
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

    async getOrderById(orderId: string) {
        return fetch(environment.backendUrl + '/orders/' + orderId)
            .then((response) => response.json())
            .then((data) => ({
                ...data,
                date: new Date(data.createdAt).toLocaleDateString(),
                time:
                    new Date(data.createdAt).toLocaleTimeString().slice(0, -3) +
                    'hs',
            }));
    }
}
