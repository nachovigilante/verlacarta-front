import { Component, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer' /* @vite-ignore */;
import { ActivatedRoute } from '@angular/router';
import { Restaurant, RestaurantsService } from '../restaurants.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [PdfViewerModule],
    styleUrl: './menu.component.scss',
    templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
    menuPdfUrl: string = '';
    tableNumber?: string;

    constructor(
        private route: ActivatedRoute,
        private restaurantsService: RestaurantsService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            const id = params.get('id');
            this.tableNumber = params.get('tableNumber') || undefined;
            if (id) {
                const restaurant: Restaurant | null =
                    await this.restaurantsService.getRestaurantById(id);
                if (restaurant) {
                    this.menuPdfUrl = restaurant.menu;
                }
            }
        });
    }
}
