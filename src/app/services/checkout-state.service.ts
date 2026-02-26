import { Injectable, signal, computed } from '@angular/core';
import { CartService } from './cart.service';
import { PaymentService } from './payment.service';
import { MercadoPagoPaymentRequest } from '../interfaces/payment/payment-request.interface';
import { CheckoutRequest } from '../interfaces/checkout/checkout-request.interface';
import { OrderFormRequest } from '../interfaces/order/order-form-request.interface';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CheckoutStateService {


  private cartService = inject(CartService);
  private paymentService = inject(PaymentService);

  shippingAddress = signal<string>('');
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

  onPaymentSuccess() {
    this.showSuccessModal.set(true);
    this.isSubmitting.set(false);
  }

  createOrderAndPay(paymentRequest: MercadoPagoPaymentRequest, onComplete?: () => void) {
    const orderRequest: OrderFormRequest = {
      shippingAddress: this.shippingAddress()
    };

    const checkoutRequest: CheckoutRequest = {
      payment: paymentRequest,
      order: orderRequest
    };

    this.paymentService.processPayment(checkoutRequest)
      .subscribe({
        next: (res) => {
          console.log('Payment and order status:', res);
          this.cartService.cartResource.reload();
          this.onPaymentSuccess();
          if (onComplete) onComplete();
        },
        error: (err) => {
          console.error('Payment error:', err);
          if (onComplete) onComplete();
        }
      });
  }
}
