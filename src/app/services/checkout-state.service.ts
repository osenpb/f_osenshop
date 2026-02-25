import { OrderFormRequest } from './../interfaces/order/order-form-request.interface';
import { Injectable, signal, computed } from '@angular/core';
import { OrderService } from './order.service';
import { CartService } from './cart.service';
import { PaymentService } from './payment.service';
import { MercadoPagoPaymentRequest } from '../interfaces/payment/payment-request.interface';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CheckoutStateService {


  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private paymentService = inject(PaymentService);

  shippingAddress = signal<string>('');
  triggerPayment = signal<boolean>(false);
  showSuccessModal = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  checkoutFormValid = signal<boolean>(false);
  paymentFormValid = signal<boolean>(false);

  isFormValid = computed(() => this.checkoutFormValid() && this.paymentFormValid());

  setShippingAddress(address: string) {
    this.shippingAddress.set(address);
  }

  setCheckoutFormValid(isValid: boolean) {
    this.checkoutFormValid.set(isValid);
  }

  setPaymentFormValid(isValid: boolean) {
    this.paymentFormValid.set(isValid);
  }

  submitPayment() {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);

    this.orderService.createOrder({ shippingAddress: this.shippingAddress() })
      .subscribe({
        next: () => {
          this.cartService.cartResource.reload();
          this.triggerPayment.set(true);
          setTimeout(() => this.triggerPayment.set(false), 100);
        },
        error: () => {
          this.isSubmitting.set(false);
        }
      });
  }

  onPaymentSuccess() {
    this.showSuccessModal.set(true);
    this.isSubmitting.set(false);
  }

  createOrderAndPay(paymentRequest: MercadoPagoPaymentRequest, onComplete?: () => void) {
    const orderFormRequest: OrderFormRequest = { shippingAddress: this.shippingAddress() };

    this.orderService.createOrder(orderFormRequest)
      .subscribe({
        next: () => {
          this.cartService.cartResource.reload();

          this.paymentService.processPayment(paymentRequest, orderFormRequest)
            .subscribe({
              next: (res) => {
                console.log('Payment status:', res);
                this.onPaymentSuccess();
                if (onComplete) onComplete();
              },
              error: (err) => {
                console.error('Payment error:', err);
                if (onComplete) onComplete();
              }
            });
        },
        error: () => {
          if (onComplete) onComplete();
        }
      });
  }
}
