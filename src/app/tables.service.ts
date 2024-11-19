import { Injectable } from '@angular/core';
import { Order } from './order/orders.service';
import { environment } from '../environments/environment';

export type Table = {
  id: string,
  restaurantId: string,
  number: number,
}

export type ExtendedTable = Table & {
  orders: Order[],
}

@Injectable({
    providedIn: 'root',
})
export class TablesService {
    constructor() {}

    async getTableById(id: string): Promise<Table | null> {
        try {
            const response = await fetch(
                `${environment.backendUrl}/tables/${id}`,
            );

            if (response.ok) {
                return await response.json();
            } else {
                console.error(
                    `Failed to fetch table with id ${id}:`,
                    response.statusText,
                );
                return null;
            }
        } catch (error) {
            console.error(`Error fetching table with id ${id}:`, error);
            return null;
        }
    }
}
