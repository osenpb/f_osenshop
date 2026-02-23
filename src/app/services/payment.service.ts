import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/payments`;

  processPayment(paymentData: PaymentRequest) {
    return this.http.post(this.baseUrl, paymentData);
  }
}
