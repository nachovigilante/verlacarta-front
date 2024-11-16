import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../auth.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin-login',
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
        RouterOutlet,
    ],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {
        this.loginForm = this.fb.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    async onSubmit() {
        if (!this.loginForm.valid) {
            console.log('AAAAAAAAA');
            return;
        } else {
            try {
                await this.authService.login(
                    this.loginForm.value.name,
                    this.loginForm.value.password,
                );
                this.router.navigate(['/admin/orders']);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
