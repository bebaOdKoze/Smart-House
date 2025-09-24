import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, FormGroup, Form } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, InputTextModule, PasswordModule,
    ButtonModule, CardModule, Toast
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService]
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, private messageService: MessageService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      }
    )
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName)
    return !!(control && control.invalid && control.touched)
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Neispravan unos',
        detail: 'Popuni sva polja',
        life: 3000
      });
      return;
    }
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Uspešan login',
          detail: `Dobrodošla, ${username}`,
          life: 3000
        });
        //this.cookie.set("token", res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Greška pri loginu',
          detail: err.error?.error || 'Pogrešan username ili lozinka',
          life: 4000
        });
      }
    });
  }
}