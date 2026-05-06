import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

const notBlankValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value as string | null;
  if (value == null) return { blank: true };
  return value.trim().length === 0 ? { blank: true } : null;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="min-h-screen py-20 container-custom">
      <h1 class="section-title">Get In Touch</h1>
      <p class="section-subtitle">I'd love to hear from you</p>
      <div class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 smooth-shadow">
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Name</label>
            <input 
              type="text" 
              formControlName="name"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p class="mt-2 text-sm text-red-500" *ngIf="showError('name') && nameControl.errors?.['blank']">
              Name is required.
            </p>
            <p class="mt-2 text-sm text-red-500" *ngIf="showError('name') && nameControl.errors?.['minlength']">
              Name length must be greater than 5 characters.
            </p>
            <p class="mt-2 text-sm text-red-500" *ngIf="showError('name') && nameControl.errors?.['maxlength']">
              Name length must be less than 30 characters.
            </p>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Email</label>
            <input 
              type="email" 
              formControlName="email"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p class="mt-2 text-sm text-red-500" *ngIf="showError('email') && emailControl.errors?.['required']">
              Email is required.
            </p>
            <p class="mt-2 text-sm text-red-500" *ngIf="showError('email') && emailControl.errors?.['email']">
              Enter a valid email address.
            </p>
          </div>
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-gray-700 dark:text-gray-300 font-bold">Message</label>
              <span
                class="text-sm font-medium"
                [class.text-green-600]="messageLength === 140"
                [class.dark:text-green-400]="messageLength === 140"
                [class.text-red-500]="messageLength !== 140"
              >
                {{ messageLength }}/140
              </span>
            </div>
            <textarea 
              formControlName="message"
              rows="5"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            ></textarea>
            <p class="mt-2 text-sm text-red-500" *ngIf="showError('message') && messageControl.errors?.['required']">
              Message is required.
            </p>
            <p class="mt-2 text-sm text-red-500" *ngIf="showError('message') && (messageControl.errors?.['minlength'] || messageControl.errors?.['maxlength'])">
              Message must be between 10 and 140 characters long.
            </p>
          </div>
          <button
            type="submit"
            class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="contactForm.invalid"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  `,
  styles: [],
})
export class ContactComponent {
  submitted = false;

  contactForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notBlankValidator, Validators.minLength(5), Validators.maxLength(29)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notBlankValidator, Validators.minLength(10), Validators.maxLength(140)],
    }),
  });

  get nameControl(): FormControl<string> {
    return this.contactForm.controls.name;
  }

  get emailControl(): FormControl<string> {
    return this.contactForm.controls.email;
  }

  get messageControl(): FormControl<string> {
    return this.contactForm.controls.message;
  }

  get messageLength(): number {
    return this.messageControl.value.length;
  }

  showError(controlName: 'name' | 'email' | 'message'): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      return;
    }

    console.log(this.contactForm.value);
  }
}
