import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    SimpleChanges,
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
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RestaurantsService } from '../restaurants.service';
import { LocationService } from '../../location.service';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
    selector: 'app-create-restaurant',
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './create-restaurant.component.html',
    styleUrls: ['./create-restaurant.component.scss'],
})
export class CreateRestaurantComponent {
    restaurantForm: FormGroup;
    logo: string | null = null;
    banner: string | null = null;
    lat: number = 0;
    lng: number = 0;
    map: mapboxgl.Map | undefined;
    style = 'mapbox://styles/mapbox/streets-v11';
    marker: mapboxgl.Marker | undefined;

    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private restaurantService: RestaurantsService,
        private locationService: LocationService,
    ) {
        this.restaurantForm = this.fb.group(
            {
                name: ['', Validators.required],
                password: ['', Validators.required],
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
                banner: [''],
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
        } else {
            return { timeMismatch: false };
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

    onBannerSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64String = (e.target?.result as string) || '';
                    this.restaurantForm.get('banner')?.setValue(base64String);
                    this.banner = base64String;
                    this.cd.detectChanges();
                };
                reader.readAsDataURL(file);
            } else {
                console.error('Selected file is not an image.');
            }
        }
    }

    async onLocationChange($event: Event) {
        const input = $event.target as HTMLInputElement;
        const inputLocation = input.value;

        try {
            const geocode = await this.locationService.geocode(inputLocation);

            this.restaurantForm.patchValue({ location: geocode.location });
            this.lat = geocode.position.lat;
            this.lng = geocode.position.lng;

            console.log('Geocode:', geocode);

            this.marker?.setLngLat([this.lng, this.lat] as mapboxgl.LngLatLike);

            console.log(this.marker?.getLngLat);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    }

    onSubmit() {
        if (this.restaurantForm.valid) {
            this.restaurantService
                .createRestaurant(
                    this.restaurantForm.value.name,
                    this.restaurantForm.value.password,
                    this.restaurantForm.value.location,
                    this.restaurantForm.value.tables,
                    this.restaurantForm.value.logo,
                    this.restaurantForm.value.banner,
                    this.restaurantForm.value.menu,
                    this.lat,
                    this.lng,
                )
                .then((response: any) => {
                    console.log('Restaurant created:', response);
                })
                .catch((err: any) => {
                    console.error('Error creating restaurant:', err);
                });
        } else {
            console.log(this.restaurantForm);
            console.log('Form is invalid');
        }
    }

    async onDragEnd(data: { target: mapboxgl.Marker }) {
        const lngLat = data.target.getLngLat();

        this.lat = lngLat.lat;
        this.lng = lngLat.lng;

        console.log(lngLat);

        const location = await this.locationService.reverseGeocode({
            lat: this.lat,
            lng: this.lng,
        });

        this.restaurantForm.patchValue({ location });
    }

    async ngOnInit() {
        const position = await this.locationService.getCurrentLocation();
        this.lat = position.lat;
        this.lng = position.lng;

        this.map = new mapboxgl.Map({
            accessToken: environment.apiKey,
            container: 'map',
            style: this.style,
            zoom: 14,
            center: [this.lng, this.lat],
        });

        this.marker = new mapboxgl.Marker({
            draggable: true,
        })
            .setLngLat([this.lng, this.lat] as mapboxgl.LngLatLike)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<h3>Acá está tu restaurant</h3><p>Podés mover este marcador</p>`,
                ),
            )
            .addTo(this.map);

        this.marker.on('dragend', (data) =>
            this.onDragEnd({ target: data.target }),
        );
    }
}
