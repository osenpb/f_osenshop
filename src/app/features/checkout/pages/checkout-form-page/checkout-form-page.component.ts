import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutComponent } from "../../components/checkout-form/checkout-form.component";
import { CheckoutStateService } from '../../../../services/checkout-state.service';
import { LoggingService } from '../../../../services/logging.service';

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
  private loggingService = inject(LoggingService);

  constructor() {
    effect(() => {
      const isValid = this.checkoutState.checkoutFormValid();
      this.loggingService.debug(`CheckoutFormPageComponent - checkoutFormValid: ${isValid}`, 'CheckoutFormPageComponent');
      this.cdr.markForCheck();
    });
  }

  onContinueToPayment() {
    this.router.navigate(['/checkout/payment']);
  }

}
