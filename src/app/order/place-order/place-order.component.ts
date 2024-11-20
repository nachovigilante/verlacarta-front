import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { LocationService } from '../../location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
    Restaurant,
    RestaurantsService,
} from '../../restaurant/restaurants.service';
import { OrdersService } from '../orders.service';

@Component({
    selector: 'app-place-order',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
    ],
    templateUrl: './place-order.component.html',
    styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent {
    orderForm: FormGroup;
    type: 'PickUp' | 'DineIn' = 'DineIn';
    restaurant: Restaurant | null = null;
    tableId: string | null = null;
    ableToOrder: boolean = false;

    constructor(
        private fb: FormBuilder,
        private restaurantService: RestaurantsService,
        private orderService: OrdersService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.orderForm = this.fb.group({
            email: [
                '',
                [Validators.required, Validators.email, this.emailValidator],
            ],
            details: ['', Validators.required],
        });
    }

    emailValidator: ValidatorFn = (
        control: AbstractControl,
    ): ValidationErrors | null => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
        return emailPattern.test(control.value) ? null : { invalidEmail: true };
    };

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            const restaurantId = params.get('id');
            this.tableId = params.get('tableId') || null;

            if (!restaurantId) {
                this.router.navigate(['/']);
                return;
            }

            this.restaurant =
                await this.restaurantService.getRestaurantById(restaurantId);

            if (!this.restaurant) {
                this.router.navigate(['/']);
                return;
            }

            if (this.tableId && this.tableId !== 'pickup') {
                this.type = 'DineIn';
            } else {
                this.type = 'PickUp';
            }
            
            console.log(this.type);

            if (
                this.restaurant.distanceToUserInMeters <= 50 ||
                this.type === 'PickUp'
            ) {
                this.ableToOrder = true;
            } else {
                this.ableToOrder = false;
            }
        });
    }

    onSubmit() {
        if (this.orderForm.valid) {
            if (this.type === 'DineIn' && !this.tableId) {
                console.log('Table ID is required for DineIn orders');
                return;
            }

            if (!this.restaurant) {
                console.log('Restaurant is required');
                return;
            }

            if (this.ableToOrder) {
                this.orderService
                    .placeOrder(
                        this.orderForm.value.email,
                        this.orderForm.value.details,
                        this.type,
                        this.restaurant!.id,
                        this.tableId,
                    )
                    .then((order) => {
                        if (order) {
                            this.router.navigate(['/order', order.id]);
                        }
                    });
            }
        } else {
            console.log(this.orderForm);
            console.log('Form is invalid');
        }
    }
}
