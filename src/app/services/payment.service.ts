import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CheckoutRequest } from '../interfaces/checkout/checkout-request.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/checkout/process`;

  processPayment(checkoutRequest: CheckoutRequest) {
    return this.http.post(this.baseUrl, checkoutRequest);
  }
}
