import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutComponent } from "../../components/checkout-form/checkout-form.component";
import { CheckoutStateService } from '../../../../services/checkout-state.service';

@Component({
  selector: 'app-checkout-form-page.component',
  imports: [CheckoutComponent],
  templateUrl: './checkout-form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormPageComponent {

  checkoutState = inject(CheckoutStateService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    // Detectar cambios cuando la signal cambia
    effect(() => {
      const isValid = this.checkoutState.checkoutFormValid();
      console.log('CheckoutFormPageComponent - checkoutFormValid:', isValid);
      this.cdr.markForCheck();
    });
  }


  onContinueToPayment() {
    this.router.navigate(['/checkout/payment']);
  }

}
