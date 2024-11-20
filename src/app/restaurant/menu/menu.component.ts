import { Component, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer' /* @vite-ignore */;
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant, RestaurantsService } from '../restaurants.service';
import { Table, TablesService } from '../../tables.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [PdfViewerModule],
    styleUrl: './menu.component.scss',
    templateUrl: './menu.component.html',
})
export class MenuComponent {
    menuPdfUrl: string = '';
    table: Table | null = null;
    restaurant: Restaurant | null = null;
    pickup: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private restaurantsService: RestaurantsService,
        private router: Router,
        private tablesService: TablesService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            const id = params.get('id');

            console.log(this.route);

            if (!id) {
                this.router.navigate(['/']);
                return;
            }

            const tableId = params.get('tableId') || undefined;

            this.restaurant =
                await this.restaurantsService.getRestaurantById(id);

            if (!this.restaurant) {
                this.router.navigate(['/']);
                return;
            }

            this.menuPdfUrl = this.restaurant.menu;

            if (!tableId) return;

            if (tableId !== 'pickup') {
                this.table = await this.tablesService.getTableById(tableId);

                if (!this.table) {
                    this.router.navigate(['/']);
                    return;
                }
            } else {
                this.pickup = true;
            }
        });
    }
}
