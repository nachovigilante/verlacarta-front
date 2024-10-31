import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
    AbstractControl,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { LocationService, Position } from '../location.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Restaurant, RestaurantsService } from '../restaurants.service';

@Component({
    selector: 'app-create-restaurant',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        HeaderComponent,
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './create-restaurant.component.html',
    styleUrls: ['./create-restaurant.component.scss'],
})
export class CreateRestaurantComponent {
    restaurantForm: FormGroup;
    logo: string | null = null;
    locationService: any;

    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private restaurantService: RestaurantsService,
    ) {
        this.restaurantForm = this.fb.group(
            {
                name: ['', Validators.required],
                location: ['', Validators.required],
                contactEmail: [
                    '',
                    [
                        Validators.required,
                        Validators.email,
                        this.emailValidator,
                    ],
                ],
                contactPhone: ['', [Validators.pattern(/^\d+$/)]],
                menu: ['', Validators.required],
                openTime: [''],
                closeTime: [''],
                tables: ['', [Validators.required, Validators.min(1)]],
                pickup: [false],
                logo: [''],
                description: [''],
            },
            { validators: this.timeValidator },
        );
    }

    timeValidator(control: AbstractControl): ValidationErrors | null {
        const openTime = control.get('openTime')?.value;
        const closeTime = control.get('closeTime')?.value;

        if (openTime && closeTime) {
            if (openTime >= closeTime) {
                return { timeMismatch: true };
            }
        }
        return null;
    }
    emailValidator: ValidatorFn = (
        control: AbstractControl,
    ): ValidationErrors | null => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
        return emailPattern.test(control.value) ? null : { invalidEmail: true };
    };

    onLogoSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64String = (e.target?.result as string) || '';
                    this.restaurantForm.get('logo')?.setValue(base64String);
                    this.logo = base64String;
                    this.cd.detectChanges();
                };
                reader.readAsDataURL(file);
            } else {
                console.error('Selected file is not an image.');
            }
        }
    }

    onSubmit() {
        console.log(this.restaurantForm.value);
        if (this.restaurantForm.valid) {
            this.restaurantService
                .createRestaurant(
                    this.restaurantForm.value.name,
                    this.restaurantForm.value.location,
                    this.restaurantForm.value.tables,
                    this.restaurantForm.value.logo,
                    this.restaurantForm.value.menu,
                )
                .then((response: any) => {
                    console.log('Restaurant created:', response);
                    this.restaurantForm.reset();
                })
                .catch((err: any) => {
                    console.error('Error creating restaurant:', err);
                });
        } else {
            console.log(this.restaurantForm);
            console.log('Form is invalid');
        }
    }
}
