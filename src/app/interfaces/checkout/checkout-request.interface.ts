import { OrderFormRequest } from "../order/order-form-request.interface";

export interface CheckoutRequest {
  payment: PaymentRequest;
  order: OrderFormRequest;

}
