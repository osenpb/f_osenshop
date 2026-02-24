import { ChangeDetectionStrategy, Component, ViewChild, signal, inject } from '@angular/core';
import { PaymentComponent } from "../../../payment/payment.component/payment.component";
import { SuccessModalOrderComponent } from "../../components/success-modal-order.component/success-modal-order.component";
import { CheckoutStateService } from '../../../../services/checkout-state.service';

@Component({
  selector: 'app-checkout-payment-page.component',
  imports: [PaymentComponent, SuccessModalOrderComponent],
  templateUrl: './checkout-payment-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPaymentPageComponent {
  @ViewChild(PaymentComponent) paymentComponent!: PaymentComponent;

  checkoutState = inject(CheckoutStateService);

  isFormReady = signal(false);

  onPaymentReady() {
    this.isFormReady.set(true);
  }

  onSubmit() {
    if (this.paymentComponent) {
      this.paymentComponent.submitPayment();
    }
  }

  get isSubmitting() {
    return this.checkoutState.isSubmitting;
  }
}
