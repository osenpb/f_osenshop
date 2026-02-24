import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, DestroyRef, signal, Output, EventEmitter } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MercadoPagoInstance, CardFormInstance, CardFormData } from '../../../interfaces/payment/mercadopago.interfaces';
import { MercadoPagoPaymentRequest } from '../../../interfaces/payment/payment-request.interface';
import { PaymentService } from '../../../services/payment.service';
import { CheckoutStateService } from '../../../services/checkout-state.service';
import { CartService } from '../../../services/cart.service';
import { environment } from '../../../../environments/environment';


declare const MercadoPago: { new (publicKey: string, options: { locale: string }): MercadoPagoInstance; };

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements OnInit, OnDestroy {
  @Output() ready = new EventEmitter<void>();

  private mp!: MercadoPagoInstance;
  private cardForm!: CardFormInstance;
  private paymentService = inject(PaymentService);
  private destroyRef = inject(DestroyRef);
  private checkoutState = inject(CheckoutStateService);
  private cartService = inject(CartService);

  isFormReady = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  showSuccessModal = () => this.checkoutState.showSuccessModal();

  submitPayment() {
    const form = document.getElementById('form-checkout') as HTMLFormElement;
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  }

  ngOnInit(): void {
    this.mp = new MercadoPago(environment.mercadoPagoPublicKey, { locale: 'es-PE' });

    this.cardForm = this.mp.cardForm({
      amount: "100.00",
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: { id: "form-checkout__cardNumber", placeholder: "Número de tarjeta" },
        expirationDate: { id: "form-checkout__expirationDate", placeholder: "MM/YY" },
        securityCode: { id: "form-checkout__securityCode", placeholder: "CVV" },
        cardholderName: { id: "form-checkout__cardholderName", placeholder: "Nombre en la tarjeta" },
        issuer: { id: "form-checkout__issuer" },
        installments: { id: "form-checkout__installments" },
        identificationType: { id: "form-checkout__identificationType" },
        identificationNumber: { id: "form-checkout__identificationNumber", placeholder: "DNI" },
        cardholderEmail: { id: "form-checkout__cardholderEmail", placeholder: "Email" },
      },
      callbacks: {
        onFormMounted: (error: Error | null) => {
          if (error) console.error("Form mount error:", error);
          else {
            console.log("Form mounted correctly");
            this.isFormReady.set(true);
            this.checkoutState.setPaymentFormValid(true);
            this.ready.emit();
          }
        },
        onSubmit: (event: Event) => {
          event.preventDefault();
          const data: CardFormData = this.cardForm.getCardFormData();

          if (!data.token) {
            console.error("Payment form invalid - missing token");
            return;
          }

          this.isSubmitting.set(true);

          this.checkoutState.createOrderAndPay({
            token: data.token,
            payment_method_id: (data as any).paymentMethodId ?? (data as any).payment_method_id,
            issuer_id: (data as any).issuer?.id ?? (data as any).issuer_id,
            transaction_amount: 100.00,
            installments: Number(data.installments ?? 1),
            description: 'Portfolio product',
            payer: { email: (data as any).cardholderEmail ?? 'test@test.com' }
          }, () => this.isSubmitting.set(false));
        },
        onFetching: (resource: string) => console.log("Fetching:", resource)
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cardForm) {
      this.cardForm.unmount();
    }
  }
}
