import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmitResponse {
  message: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // Replace with your deployed backend endpoint when available.
  private readonly endpoint = '/api/contact';

  constructor(private http: HttpClient) {}

  submitContactForm(payload: ContactFormPayload): Observable<ContactSubmitResponse> {
    return this.http.post<ContactSubmitResponse>(this.endpoint, payload);
  }
}
