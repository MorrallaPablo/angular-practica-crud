import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup;

  submitting = signal(false);
  errorMessage = signal<string|null>(null);
  succesMessage = signal<string|null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ){
    this.form = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onFormSubmit() {
    this.submitting.set(true);
    this.errorMessage.set(null);
    this.succesMessage.set(null);

    this.authService.login({
      email: this.form.get('email')?.value, 
      password: this.form.get('password')?.value
    }).subscribe({
      next: (loginResponse) => {
        this.submitting.set(false);
        this.errorMessage.set(null);
        this.succesMessage.set('Login successfull!');
      },

      error: (error) => {
        this.submitting.set(false);
        this.errorMessage.set('Error while loging in');
        this.succesMessage.set(null);
      }
    });
  }
}
