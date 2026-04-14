import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="min-h-screen py-20 container-custom">
      <h1 class="section-title">Get In Touch</h1>
      <p class="section-subtitle">I'd love to hear from you</p>
      <div class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 smooth-shadow">
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Name</label>
            <input 
              type="text" 
              formControlName="name"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Email</label>
            <input 
              type="email" 
              formControlName="email"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Message</label>
            <textarea 
              formControlName="message"
              rows="5"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            ></textarea>
          </div>
          <button type="submit" class="btn-primary w-full">Send Message</button>
        </form>
      </div>
    </section>
  `,
  styles: [],
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });

  onSubmit(): void {
    console.log(this.contactForm.value);
  }
}
