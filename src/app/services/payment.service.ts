import { OrderFormRequest } from './../interfaces/order/order-form-request.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MercadoPagoPaymentRequest } from '../interfaces/payment/payment-request.interface';

interface CheckoutRequest {
  payment: MercadoPagoPaymentRequest;
  order: OrderFormRequest;
}


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/checkout/process`;

  processPayment(payment: MercadoPagoPaymentRequest, order: OrderFormRequest) {
    return this.http.post(this.baseUrl, {
      payment,
      order
    });
  }
}
