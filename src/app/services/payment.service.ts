import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MercadoPagoPaymentRequest } from '../interfaces/payment/payment-request.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/payments`;

  processPayment(paymentData: MercadoPagoPaymentRequest) {
    return this.http.post(this.baseUrl, paymentData);
  }
}
