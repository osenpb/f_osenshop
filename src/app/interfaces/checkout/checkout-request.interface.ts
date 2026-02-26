import { OrderFormRequest } from "../order/order-form-request.interface";
import { MercadoPagoPaymentRequest } from "../payment/payment-request.interface";

export interface CheckoutRequest {
  payment: MercadoPagoPaymentRequest;
  order: OrderFormRequest;

}
